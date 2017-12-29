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

import { Link, ListOptions, Event } from './../../interfaces/index';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnChanges, DoCheck {

  @Output() events: EventEmitter<Event>;
  @Input() options: ListOptions;

  links: Link[];
  isMenu: boolean;


  private _differ: KeyValueDiffer<string, any> = null;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _differs: KeyValueDiffers) {

    this.events = new EventEmitter();
    this.links = [];
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

  onLinkClick(link: Link) {
    this._openExternalLink(link.url);
  }

  onHelpLinkClick(link: Link) {
    this._openExternalLink(link.helpLink);
  }

  onMenuClick() {
    if (!this.isMenu) {
      this.isMenu = true;
    } else {
      this.isMenu = false;
    }
    this.events.emit({
      type: 'menu',
      data: this.isMenu
    });
  }

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'links':
        if (this.options.links) {
          this.links = this.options.links;
        }

    }
  }

  private _openExternalLink(url: string) {
    let aTag: any = document.createElement('a');
    aTag.href = url;
    aTag.target = '_blank';
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
    aTag = null;
  }


}
