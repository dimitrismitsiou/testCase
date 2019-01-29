import { ChartsRoutingModule } from './charts-page/charts-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterSourcesPipe } from './filter-sources.pipe';
import { NewsComponent } from './news/news.component';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from './charts-page/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './charts-page/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts-page/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './charts-page/radar-chart/radar-chart.component';
import { PieChartComponent } from './charts-page/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FilterSourcesPipe,
    NewsComponent,
    ChartsComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
