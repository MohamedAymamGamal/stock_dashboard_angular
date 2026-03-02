import {Component, OnInit} from '@angular/core';
import {Api} from '../../services/api';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Stock} from '../../Types/Stock';
import {params} from '../../Types/Params';
import {Pagination} from '../../Components/pagination/pagination';
import {pagination} from '../../Types/pagination';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule,Pagination],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
})
export class Stocks implements OnInit {
  stocks: Stock[] = [];
  error: string = '';
  totalRecords: number = 0;
  pagination:pagination = {pageNumber: 1, pageSize: 10};

  params: params = {pageNumber: 1, pageSize: 10, symbol: '', companyName: '', sortBy: '', isDecsending: false};

  constructor(protected api: Api,private  router: Router) {}


  ngOnInit(): void {
      this.getAllStocks();
  }

  getAllStocks() {
    this.api.index<Stock[]>('stock',this.pagination)
      .subscribe({
        next: (res) => {
          this.stocks = res ;
          this.totalRecords = 100;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  // getPaginatedStocks() {
  //   this.api.index<Stock[]>('stock', this.params)
  //     .subscribe({
  //       next: (res) => {
  //         this.stocks = res ;
  //         this.totalRecords = 100;
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }


  onPageChange(event: any) {
     if(event !== this.pagination.pageNumber - 1){
      this.pagination.pageNumber = event + 1;
      this.getAllStocks();
     }
    console.log(event);
  }



  viewStockDetails(stockId: number): void {
    this.router.navigate([`/dashboard/stocks/${stockId}`]);
  }






}
