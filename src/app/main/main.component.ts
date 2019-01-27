import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  allSources = [];
  sourcesForShow = [];
  page = 0;
  totalPages = 0;
  searchValue = '';
  categories = [];
  news = [];
  selectedCategory = 'all';

  getNews = new BehaviorSubject([]);
  searchChanged: Subject<string> = new Subject<string>();
  categoryChanged: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.http.get('https://newsapi.org/v1/sources').subscribe((res: any) => {
      this.getNews.next(res.sources);
      this.allSources = res.sources;
      const tempCategories = res.sources.map(s => s.category);
      this.categories = tempCategories.filter( this.onlyUnique );
      this.applyQueryParams(this.route.snapshot.queryParams);
    }, error => {
      console.log(error);
    });

  }

  ngOnInit() {
    this.getNews.subscribe((news: any) => {
      this.totalPages = Math.ceil(news.length / 6);
      this.news = news.slice(0, 6);
      this.page = 0;
    });

    this.searchChanged.pipe(
      debounceTime(1000),
    ).subscribe(term => {
      if (term.length > 0) {
        this.getNews.next(this.getNews.getValue().filter(s => s.name.toLowerCase().startsWith(term.toLowerCase())));
      } else {
        // allagi logikis gia na krataei to proigoumeno state
        this.getNews.next(this.getNews.getValue());
      }
      this.navigateToRoute({term: term});
    });

    this.categoryChanged.pipe(
        debounceTime(500),
      ).subscribe(cat => {
        if (cat !== 'all') {
          this.getNews.next(this.allSources.filter(s => s.category.toLowerCase().startsWith(cat.toLowerCase())));
        } else {
          this.getNews.next(this.allSources);
        }
        this.navigateToRoute({category: cat});
      });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  applyQueryParams(queryParams) {
    if ('category' in queryParams) {
      this.categoryChanged.next(queryParams.category);
      this.selectedCategory = queryParams.category;
    }

    if ('term' in queryParams) {
      this.searchChanged.next(queryParams.term);
    }

    if ('page' in queryParams) {
      this.goToPage(queryParams.page);
    }
  }

  navigateToRoute(params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.getNews.getValue().length / 6);
    if (totalPages >= +page) {

    }
  }

  nextPage(page) {
    this.news = this.getNews.getValue().slice((6 * page), (6 * page) + 6);
    this.page += 1;
    this.navigateToRoute({page: this.page + 1});
  }

  previousPage(page) {
    this.news = this.getNews.getValue().slice((6 * page), (6 * page) + 6);
    this.page -= 1;
    this.navigateToRoute({page: this.page + 1});
  }

  searchSources(event: any) {
    const term = event.target.value;
    this.searchChanged.next(term);
  }

  selectCategorySource(event: any) {
    const cat = event.target.value;
    this.categoryChanged.next(cat);
  }

}
