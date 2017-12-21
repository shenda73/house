import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LinksService } from './services/links.service';
import { LocalStorageService } from './services/local-storage.service';
import { StateService } from './services/state.service';
import { AppStateService } from './app-state.service';
import { LinkPipe } from './pipes/index';

@NgModule({
  declarations: [
    AppComponent,
    LinkPipe
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [LinksService, LocalStorageService, StateService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
