import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './Components/navbar/navbar';
import {StockDetails} from './stocks/stock-details/stock-details';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    Navbar,
    NgIf,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export class Dashboard {

  constructor(protected auth:AuthService) {
  }

}
