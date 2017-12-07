import { Component } from '@angular/core';
import { Base } from './base';
import { LinksService } from './services/index';
import {AppStateService} from './app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Base {
  title = 'app';
  links: string;

  constructor(linksService: LinksService,
              appStateService: AppStateService) {
    super();
    this.subscriptions.push(linksService.responseChange$.subscribe(
      (data: any) => this.onLinkServiceResponseChange(data)
    ));
    this.links = 'loading ...';
  }

  onLinkServiceResponseChange(data: any) {
    this.links = JSON.stringify(data);
  }


}
