import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  searchResults = [];
  selectedCategory = '';

  constructor(private http: HttpClient) {
    this.http.get('https://newsapi.org/v1/sources').subscribe((res: any) => {
      this.allSources = res.sources;
      this.totalPages = Math.ceil(this.allSources.length / 6);
      this.sourcesForShow = this.allSources.slice(0, 6);
      const tempCategories = res.sources.map(s => s.category);
      this.categories = tempCategories.filter( this.onlyUnique );
    }, error => {
      console.log(error);
    });
   }

  ngOnInit() {
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  nextPage(page) {
    this.sourcesForShow = [];
    this.sourcesForShow = this.allSources.slice((6 * page), (6 * page) + 6);
    this.page += 1;
  }

  previousPage(page) {
    this.sourcesForShow = [];
    this.sourcesForShow = this.allSources.slice((6 * page), (6 * page) + 6);
    this.page -= 1;
  }

  searchSources(event: any) {
    const term = event.target.value;
    if (term !== '') {
      this.searchResults = this.allSources.filter(s => s.name.toLowerCase().startsWith(term.toLowerCase()));
    } else {
      this.searchResults = [];
    }
  }

  selectCategorySource(event: any) {
    const cat = event.target.value;
    console.log(cat);
    if (cat !== 'all') {
      this.searchResults = this.allSources.filter(s => s.category.toLowerCase().startsWith(cat.toLowerCase()));
    } else {
      this.searchResults = [];
    }
  }

}
