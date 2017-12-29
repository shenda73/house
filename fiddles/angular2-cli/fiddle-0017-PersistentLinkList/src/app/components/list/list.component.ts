import {
  Input,
  Output,
  EventEmitter,
  Component,
  OnChanges,
  AfterViewInit,
  KeyValueDiffer,
  KeyValueDiffers,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';

import { Link, ListOptions, ListEvent } from './../../interfaces/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges, DoCheck {

  @Output() events: EventEmitter<ListEvent>;
  @Input() options: ListOptions;

  links: Link[];

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

  private _applyChange(item: any): void {
    switch (item.key) {
      case 'links':
        if (this.options.links) {
          this.links = this.options.links;
        }

    }
  }

  onLinkClick(link: Link) {
    this._openExternalLink(link);
  }

  private _openExternalLink(link: Link) {
    let aTag: any = document.createElement('a');
    aTag.href = link.url;
    aTag.target = "_blank";
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
    aTag = null;
  }


}
