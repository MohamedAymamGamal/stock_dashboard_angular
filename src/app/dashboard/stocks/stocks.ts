import {Component, OnInit} from '@angular/core';
import {Api} from '../../services/api';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

@Component({
  selector: 'app-stocks',
  imports: [CommonModule],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
  standalone: true
})
export class Stocks implements OnInit {
  stocks: Stock[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(protected api: Api,private  router: Router) {}


      ngOnInit(): void {
      this.getAllStocks();
  }

  getAllStocks(): void {
    this.loading = true;
    this.error = '';
    
    this.api.index<Stock[]>('stocks').subscribe({
      next: (data) => {
        this.stocks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load stocks data';
        this.loading = false;
        console.error('Error loading stocks:', err);
      }
    });
  }

  viewStockDetails(stockId: number): void {
    this.router.navigate([`/dashboard/stocks/${stockId}`]);
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeSymbol(change: number): string {
    return change >= 0 ? '+' : '';
  }




}
