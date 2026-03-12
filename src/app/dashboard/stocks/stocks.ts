import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Api} from '../../services/api';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Stock} from '../../Types/Stock';
import {params} from '../../Types/Params';
import {Pagination} from '../../Components/pagination/pagination';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule, Pagination, TableModule, ButtonModule],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
  standalone:true
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  totalRecords: number = 1;

  params: params = {
    pageNumber: 1,
    pageSize: 10,
    symbol: '',
    companyName: '',
    sortBy: '',
    isDecsending: false
  };


  constructor(protected api: Api, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks() {
    this.api.index<Stock[]>('stock', this.params).subscribe({
      next: (value: any) => {
        setTimeout(() => {
          this.stocks = value.data || value;
          this.totalRecords = value.totalCount;

          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onPageChange(event: any) {
    if (this.params.pageNumber != event) {
      this.params.pageNumber = event;
      this.getAllStocks();
    }
  }

  trackByStockId(index: number, stock: Stock): number {
    return stock.id;
  }

  delete(stockId:number){
    this.api.destroy('stock', stockId).subscribe(() => {
      this.getAllStocks();
    });
  }
  viewStockDetails(stockId: number): void {
    this.router.navigate([`/dashboard/stocks/${stockId}`]);
  }
}
