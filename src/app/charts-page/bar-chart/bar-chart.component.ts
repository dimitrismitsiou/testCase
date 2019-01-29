import { NewsService } from './../../news.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'News 2018'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    combineLatest(this.newsService.updateCategories, this.newsService.countSources)
    .subscribe(data => {
      this.barChartLabels = data[0];
      data[0].forEach(cat => {
        this.barChartData[0].data.push(data[1][cat]);
      });
    });
  }

}
