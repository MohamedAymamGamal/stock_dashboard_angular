import {Component, OnInit} from '@angular/core';
import {Api} from '../../services/api';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Stock} from '../../Types/Stock';
import {Paginator} from 'primeng/paginator';
import {params} from '../../Types/Params';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule, Paginator],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
  standalone: true
})
export class Stocks implements OnInit {
  stocks: Stock[] = [];
  params:params = {pageNumber:1,pageSize:10};
  error: string = '';

  constructor(protected api: Api,private  router: Router) {}


  ngOnInit(): void {
      this.getAllStocks();
  }

  getAllStocks() {
    this.api.index<Stock[]>('stock', this.params)
      .subscribe({
        next: (res) => {
          this.stocks = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  onPageChange(pageIndex: number) {
    this.params.pageNumber = pageIndex + 1;
    this.getAllStocks();
  }

  viewStockDetails(stockId: number): void {
    this.router.navigate([`/dashboard/stocks/${stockId}`]);
  }






}
