import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote.component';
import { VolumeComponent } from './volume/volume.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BaseComponent } from './base.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular/core/template';
import { QuoteService } from './quote/quote.service';
import { VolumeService } from './volume/volume.service';
import { IntradayService } from './line-chart/intraday.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxRangeSelectorModule,
    DxTemplateModule,
    NgbCarouselModule,
    DxChartModule,
    DxDataGridModule
  ],
  declarations: [ AppComponent,
    QuoteComponent,
    VolumeComponent,
    LineChartComponent,
    PieChartComponent,
    BaseComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    QuoteService,
    VolumeService,
    IntradayService],
  bootstrap: [AppComponent]

})
export class AppModule { }
