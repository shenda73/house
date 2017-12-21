import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, MenuComponent],
  exports: [
    ListComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
