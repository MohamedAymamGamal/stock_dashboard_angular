import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toast,
    ToastModule,
    ConfirmDialog,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {
  protected readonly title = signal('stock');
}
