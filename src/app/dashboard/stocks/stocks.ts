import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef, inject
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
import {Observable, Subscription, take} from 'rxjs';
import {Button} from '../../Components/button/button';
import {InputLabel} from '../../Components/Tables/input-label/input-label';
import {FormsModule} from '@angular/forms';
import {Toast} from '../../services/toast';
import {ListBase} from '../../ExtendsService/list-base';



@Component({
  selector: 'app-stocks',
  imports: [CommonModule, Pagination, TableModule, ButtonModule, InputLabel, Button, FormsModule],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone :true
})
export class StocksComponent  extends ListBase implements OnInit {

  //endpoints
  get endpoint() { return 'stock'; }
  //stocks
  get stocks()   { return this.items as Stock[]; }

  //dependencies
  private toast = inject(Toast);
  private confirm = inject(ConfirmDialogService);
  private  router = inject(Router);


  override ngOnInit(): void {
    super.ngOnInit();

    // pre-fill search input from URL on load
    this.state$.pipe(take(1)).subscribe(state => {
      this.searchQuery = state.companyName;
    });
  }


  state$      = this.query.state$;
  searchQuery = '';

  delete(stockId: number) {
    this.confirm.open({
      title:       'Delete',
      message:     'Are you sure :)',
      type:        'danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.api.destroy('stock', stockId).subscribe(() => {
          setTimeout(() => {
            this.query.patch({});
            this.toast.success('deleted successfully');
            this.refresh();
          },300);

        });
      }
    });
  }

  viewStockDetails(stockId: number): void {
    this.router.navigate(['/dashboard', 'stocks', stockId]);  }

  override trackById(_:number, item:any){
    return item.stockId;
  }

  createStock() {
    this.router.navigate(['/dashboard', 'stocks', 'create']);
  }
  // ngOnDestroy(): void {
  //   this.state$.unsubscribe();
  // }
}
