import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { VolumeComponent } from './volume/volume.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BaseComponent } from './base.component';

import { DxChartModule, DxDataGridModule, DxSparklineModule, DxTemplateModule } from 'devextreme-angular';
import { QuoteService } from './quote/quote.service';
import { VolumeService } from './volume/volume.service';
import { IntradayService } from './line-chart/intraday.service';

@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    VolumeComponent,
    LineChartComponent,
    PieChartComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    DxSparklineModule,
    DxTemplateModule,
    NgbModule.forRoot(),
    DxChartModule,
    DxDataGridModule
  ],
  providers: [QuoteService, VolumeService, IntradayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
