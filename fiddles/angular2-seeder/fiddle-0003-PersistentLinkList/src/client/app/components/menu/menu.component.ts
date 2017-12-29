import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';

import { Link, MenuOptions, Event } from './../../interfaces/index';
import { LinkPipe } from './../../pipes/index';

@Component({
  moduleId: module.id,
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnChanges, DoCheck {

  @Output() events: EventEmitter<Event>;
  @Input() options: MenuOptions;

  isSearch: boolean;
  searchCriteria: string;
  allLinks: Link[];
  links: Link[];

  get isEmpty(): boolean {
    return this.links.length === 0 ? true : false;
  }

  private _linkPipe: LinkPipe;
  private _differ: KeyValueDiffer<string, any> = null;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {
    this.searchCriteria = '';
    this.events = new EventEmitter();
    this.allLinks = this.links = [];
    this._linkPipe = new LinkPipe();
  }

  get isSelection(): boolean {
    if (this.options && this.options.links) {
      return this.options.links.some((link: Link) => {
        return link.selected === true ? true : false;
      });
    }
    return false;
  }

  ngOnChanges(changes: any): void {
    if ('options' in changes) {
      const value = changes['options'].currentValue;
      if (!this._differ && value) {
        this._differ = this._differs.find(value).create();
      }
    }
  }

  ngDoCheck(): void {
    if (this._differ) {
      const changes: any = this._differ.diff(this.options);
      if (changes) {
        changes.forEachChangedItem((item: any) => {
          this._applyChange(item);
        });
        changes.forEachAddedItem((item: any) => {
          this._applyChange(item);
        });
      }
    }
  }

  onCheckBoxClick(event: any, link: Link) {

    link.selected = event.target.checked;

    this.events.emit({
      type: 'update',
      data: this._transform(link)
    });
  }

  onClearClick() {
    this.isSearch = false;
    this.events.emit({
      type: 'clear',
      data: null
    });
  }

  onSearchClick() {
    this.isSearch = true;
  }

  onClearSearchClick() {
    document.getElementById('searchField').setAttribute('value', '');
    this.isSearch = false;
    this.links = this.allLinks;
  }

  onSearchChange($event: any) {
    this.searchCriteria = $event.target.value;
    window.setTimeout(() => {
      if (this.searchCriteria.toLowerCase() !== 'search' && this.searchCriteria.trim() !== '') {
        if (this.searchCriteria.indexOf(',') !== -1) {
          const criteriaArr: string[] = this.searchCriteria.split(', ');
          console.log(criteriaArr);
          this.links = this._linkPipe.transform(this.allLinks, criteriaArr);
        } else {
          this.links = this._linkPipe.transform(this.allLinks, [this.searchCriteria]);
        }
      } else {
        this.links = this.allLinks;
      }
    }, 10);
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'links':
        if (this.options.links) {
          this.allLinks = this.links = this.options.links;
        }

    }
  }

  private _transform(link: Link): Link {
    let hayStack: string[] = link.json.split('|'),
      json = '';

    if (link.selected) {
      hayStack.push('selected');
    } else {
      hayStack = hayStack.filter((item: string) => {
        return item !== 'selected' ? true : false;
      });
    }

    hayStack.forEach((item: string, index: number) => {
      if (index === 0) {
        json = item;
      } else {
        json += '|' + item;
      }
    });

    link.json = json;

    return link;
  }


}
