import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './Components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
