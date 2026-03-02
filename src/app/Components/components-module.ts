import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Pagination} from './pagination/pagination';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    Pagination
  ],
  exports: [
    Pagination
  ]

})
export class ComponentsModule { }
