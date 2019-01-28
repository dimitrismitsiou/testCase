import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
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

  private readonly DEBOUNCE_PERIOD = 300;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.http.get('https://newsapi.org/v1/sources').subscribe((res: any) => {
      this.allSources = res.sources;
      this.getNews.next(res.sources);
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
      if ('page' in this.route.snapshot.queryParams && this.totalPages >= +this.route.snapshot.queryParams.page) {
        const askedPage = +this.route.snapshot.queryParams.page - 1;
        this.news = news.slice((6 * askedPage), (6 * askedPage) + 6);
        this.page = askedPage;
      } else {
        this.news = news.slice(0, 6);
        this.page = 0;
      }
    });

    combineLatest([this.searchChanged, this.categoryChanged]).pipe(
      debounceTime(this.DEBOUNCE_PERIOD)
    ).subscribe((res) => {
      let records = this.allSources.filter(s => s.name.toLowerCase().startsWith(res[0].toLowerCase()));
      if (res[1] !== 'all') {
        records = records.filter(s => s.category.toLowerCase().startsWith(res[1].toLowerCase()));
      }
      this.getNews.next(records);
      this.navigateToRoute({term: res[0], category: res[1], page: this.page + 1});
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
      this.searchValue = queryParams.term;
      this.searchChanged.next(queryParams.term);
    }
  }

  navigateToRoute(params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
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
