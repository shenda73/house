import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Base } from './base';
import { ListOptions, MenuOptions, Event, Link } from './interfaces/index';
import { LinksService, LocalStorageService } from './services/index';
import { AppStateService } from './app-state.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent extends Base {

  title = 'app';
  listOptions: ListOptions;
  menuOptions: MenuOptions;
  menuState = 'out';

  private _preloader: any;



  constructor(private _linksService: LinksService,
              private _appStateService: AppStateService) {
    super();
    this.subscriptions.push(_linksService.responseChange$.subscribe(
      (data: any) => this.onLinkServiceResponseChange(data)
    ));

    this._preloader = document.getElementsByClassName('preloader')[0];

  }

  onListEvents(event: Event) {
    switch (event.type) {
      case 'menu':
        this._toggleMenu(event.data);
    }
  }

  onMenuEvents(event: Event) {
    switch (event.type) {
      case 'update':
        this._saveLinkSelection(event.data);
        break;
      case 'clear':
        this._clearSelections();
        break;
    }
  }

  onClickAnywhere(event: any) {
    const cssClass: string = event.target.getAttribute('class'),
      isAnywhere: boolean = cssClass === 'card-body' ||
      cssClass === 'list-component' || cssClass === 'card-text' || cssClass === 'card-title' ? true : false;
    if (isAnywhere) {
      this._toggleMenu(false);
    }
  }

  onLinkServiceResponseChange(data: any) {

    const menuLinks: any[] = this._restoreSelections(data.data.data);
      let listLinks: any[] = menuLinks.filter((link: any) => {
            return link.selected === true ? true : false;
        });

    if (listLinks.length === 0) {
      listLinks = Object.assign([], menuLinks);
    }

    this.menuOptions = {
      links: menuLinks
    };

    this.listOptions = {
      links: this._transform(listLinks)
    };

    this._togglePreloader(false);
  }

  private _saveLinkSelection(link: Link): void {
    const db: LocalStorageService = this._appStateService.databaseService,
          state: any = db.exists('my-applications') ? db.pull('my-applications') : {};

    let listLinks: any[] = this.menuOptions.links.filter((menuLink: any) => {
      return menuLink.selected === true ? true : false;
    });

    if (listLinks.length === 0) {
      listLinks = Object.assign([], this.menuOptions.links);
    }

    state[link.id] = link.selected;
    db.push('my-applications', state);
    this.listOptions.links = listLinks;
  }

  private _clearSelections(): void {
    const db: LocalStorageService = this._appStateService.databaseService,
      state: any = db.exists('my-applications') ? db.pull('my-applications') : null;

    if (state) {
      db.zero('my-applications');
    }

    this._toggleMenu(false);

    this.menuOptions.links = this.menuOptions.links.map((link: Link) => {
        link.selected = false;
        return link;
    });
    this.menuOptions.links = this._transform(this.menuOptions.links);
    this.listOptions.links = Object.assign([], this.menuOptions.links);

  }

  private _toggleMenu(state: boolean) {
    this.menuState = state ? 'in' : 'out';
  }

  private _restoreSelections(links: any): any[] {
    const db: LocalStorageService = this._appStateService.databaseService,
      state: any = db.exists('my-applications') ? db.pull('my-applications') : null;
    if (state) {
      return links.map((link: any) => {
        if (state.hasOwnProperty(link.id) && state[link.id] === true) {
          link.selected = true;
        } else {
          link.selected = false;
        }
        return link;
      });
    }
    return links;
  }

  private _transform(links: any[]): any[] {
    return links.map((link: any) => {
      if (link.helpLink.trim() === '#') {
        link.hasHelp = false;
      } else {
        link.hasHelp = true;
      }
      link.json = link.text + '|' + link.url + '|' + link.title;
      if (link.hasHelp) {
        link.json += '|help';
      }
      if (link.selected) {
        link.json += '|selected';
      }
      return link;
    });
  }

  private _togglePreloader(isPreloader: boolean) {
    if (this._preloader) {
      if (isPreloader) {
        this._preloader.classList.remove('loaded');
      } else {
        this._preloader.classList.add('loaded');
      }
    }
  }

  private _stretch() {
    let iframe = window.parent.document.getElementsByTagName('iframe')[0];
     // iframe.width = '100%';
     // iframe.height = '500px';

  }

}

