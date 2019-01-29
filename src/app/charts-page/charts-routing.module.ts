import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { ChartsComponent } from './charts/charts.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'charts', component: ChartsComponent, children: [
    {path: 'bar-chart', component: BarChartComponent},
    {path: 'doughnut-chart', component: DoughnutChartComponent},
    {path: 'radar-chart', component: RadarChartComponent},
    {path: 'pie-chart', component: PieChartComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
