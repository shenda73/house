import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LinksService } from './services/links.service';
import { LocalStorageService } from './services/local-storage.service';
import { StateService } from './services/state.service';
import { AppStateService } from './app-state.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [LinksService, LocalStorageService, StateService, AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
