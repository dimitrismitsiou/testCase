import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  allSources = [];
  categories = [];

  updateCategories = new BehaviorSubject([]);
  countSources = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getNews();

    this.updateCategories.subscribe(categories => {
      const temp = [];
      categories.forEach(category => {
        temp[category] = this.allSources.filter (o => o.category === category).length;
      });
      this.countSources.next(temp);
    });
  }

  getNews() {
    this.http.get('https://newsapi.org/v1/sources').subscribe((res: any) => {
      this.allSources = res.sources;
      const tempCategories = res.sources.map(s => s.category);
      this.categories = tempCategories.filter( this.onlyUnique );
      this.updateCategories.next(this.categories);
    }, error => {
      console.log(error);
    });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
