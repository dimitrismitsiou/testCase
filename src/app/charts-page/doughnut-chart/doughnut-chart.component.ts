import { NewsService } from './../../news.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    combineLatest(this.newsService.updateCategories, this.newsService.countSources)
    .subscribe(data => {
      this.doughnutChartLabels = data[0];
      data[0].forEach(cat => {
        this.doughnutChartData.push(data[1][cat]);
      });
    });
  }

}
