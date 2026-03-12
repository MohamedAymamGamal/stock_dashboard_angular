import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './Components/navbar/navbar';
import {StockDetails} from './stocks/stock-details/stock-details';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    Navbar,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
