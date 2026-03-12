import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toast,
    ToastModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stock');
}
