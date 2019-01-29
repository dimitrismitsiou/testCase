import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/news.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    combineLatest(this.newsService.updateCategories, this.newsService.countSources)
    .subscribe(data => {
      this.pieChartLabels = data[0];
      data[0].forEach(cat => {
        this.pieChartData.push(data[1][cat]);
      });
    });
  }

}
