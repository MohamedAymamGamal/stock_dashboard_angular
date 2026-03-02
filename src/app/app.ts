import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {ComponentsModule} from './Components/components-module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toast,
    ToastModule,
    ComponentsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('stock');
}
