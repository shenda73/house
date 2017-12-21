import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListEditorComponent } from './list-editor/list-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, ListEditorComponent],
  exports: [
    ListComponent,
    ListEditorComponent
  ]
})
export class ComponentsModule { }
