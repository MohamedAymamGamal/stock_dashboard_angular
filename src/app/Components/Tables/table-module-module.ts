import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,

    RippleModule
  ],
  exports: [
  ]
})
export class TableModuleModule { }
