import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';


@NgModule({
  imports: [BrowserModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
