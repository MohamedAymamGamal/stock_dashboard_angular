import {Component, OnChanges, OnInit} from '@angular/core';
import {Api} from '../../services/api';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Stock} from '../../Types/Stock';
import {params} from '../../Types/Params';
import {Pagination} from '../../Components/pagination/pagination';
import {pagination} from '../../Types/pagination';
import {Subject, debounceTime, distinctUntilChanged, switchMap} from 'rxjs';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule, Pagination, TableModule, ButtonModule],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
})
export class Stocks implements OnInit {
  stocks: Stock[] = [];
  error: string = '';
  totalRecords: number = 0;
  pagination:pagination = {pageNumber: 1, pageSize: 10};

  params: params = {pageNumber: 1, pageSize: 10, symbol: '', companyName: '', sortBy: '', isDecsending: false};

  private pageChange$ = new Subject<number>();

  constructor(protected api: Api,private  router: Router) {
    this.setupPageChangeStream();
  }




  ngOnInit(): void {
      this.getAllStocks();
  }

  setupPageChangeStream() {
    this.pageChange$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(page => {
          this.pagination.pageNumber = page + 1;
          return this.api.index<Stock[]>('stock', this.pagination);
        })
      )
      .subscribe({
        next: (res) => {
          this.stocks = res;
          this.totalRecords = 100;
        },
        error: (err) => {
          console.error(err);
        }
      });
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
    this.pageChange$.next(event);
  }

  trackByStockId(index: number, stock: Stock): number {
    return stock.id;
  }



  viewStockDetails(stockId: number): void {
    this.router.navigate([`/dashboard/stocks/${stockId}`]);
  }






}
