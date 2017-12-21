import { Component } from '@angular/core';
import { Base } from './base';
import { ListOptions } from './interfaces/index';
import { LinksService} from './services/index';
import {AppStateService} from './app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Base {
  title = 'app';
  listOptions: ListOptions;

  constructor(linksService: LinksService,
              appStateService: AppStateService) {
    super();
    this.subscriptions.push(linksService.responseChange$.subscribe(
      (data: any) => this.onLinkServiceResponseChange(data)
    ));

  }

  onLinkServiceResponseChange(data: any) {
    this.listOptions = {
      links: data.data.data
    }
  }


}
