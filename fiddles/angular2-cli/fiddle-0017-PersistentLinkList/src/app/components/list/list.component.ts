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
export class ListComponent implements OnChanges, AfterViewInit, DoCheck {

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
        this._differ = this._differs.find(value).create(this._changeDetector);
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


}
