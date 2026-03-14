import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {Api} from '../../services/api';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Stock} from '../../Types/Stock';
import {params} from '../../Types/Params';
import {Pagination} from '../../Components/pagination/pagination';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogService} from '../../services/confirm-dialog.service';
import {Subscription} from 'rxjs';
import {Button} from '../../Components/button/button';
import {InputLabel} from '../../Components/Tables/input-label/input-label';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule, Pagination, TableModule, ButtonModule,InputLabel,Button],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StocksComponent implements OnInit,OnDestroy {
  stocks: Stock[] = [];
  subscription!: Subscription;

  params: params = {
    pageNumber: 1,
    pageSize: 10,
    symbol: '',
    companyName: '',
    sortBy: '',
    isDecsending: false,
    totalRecords:  1

  };


  constructor(
    protected api: Api,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private confirm: ConfirmDialogService
    ) {}



  ngOnInit(): void {

    this.route.queryParams.subscribe(p => {
      this.params.pageNumber = +p['page'] || 1 ;
      this.getAllStocks();
    })
  }

  getAllStocks() {
    this.router.navigate([], {
      queryParams: { page: this.params.pageNumber },
      queryParamsHandling: 'merge'
    });

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.api.index<Stock[]>('stock', this.params).subscribe({
      next: (value: any) => {
        setTimeout(() => {
          this.stocks = value.data ;
          this.params.totalRecords = value.totalCount;
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

  OnSearch(event:any){
    if(this.params.companyName != event){
      this.params.companyName = '';
      this.getAllStocks()
    }
  }
  @ViewChild('search') searchInput!: ElementRef
  // delete(stockId: number) {
  //
  //       this.api.destroy('stock', stockId).subscribe(() => {
  //         this.getAllStocks();
  //       });
  //
  // }
  delete(stockId: number) {
    this.confirm.open({
      title:       'Delete',
      message:     'Are you sure :)',
      type:        'danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.api.destroy('stock', stockId).subscribe(() => {
          this.getAllStocks();
        });
      }
    });
  }

  viewStockDetails(stockId: number): void {
    this.router.navigate(['/dashboard', 'stocks', stockId]);  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
