import {Component, inject, OnInit, signal} from '@angular/core';
import {Api} from '../../../../../../New folder/stock_dashboard_angular/src/app/services/api';
import {Toast} from '../../../../../../New folder/stock_dashboard_angular/src/app/services/toast';
import {ConfirmDialogService} from '../../../../../../New folder/stock_dashboard_angular/src/app/services/confirm-dialog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormConfig} from '../../../../../../New folder/stock_dashboard_angular/src/app/Types/FormConfig';
import {Validators} from '@angular/forms';
import {ReusableForm} from '../../../../../../New folder/stock_dashboard_angular/src/app/Components/reusable-form/reusable-form';
import {Stock} from '../../../../../../New folder/stock_dashboard_angular/src/app/Types/Stock';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-stock',
  imports: [ReusableForm, NgIf],
  templateUrl: './update-stock.html',
  styleUrl: './update-stock.scss',
})
export class UpdateStock implements OnInit {
  stockId: number = 0;
  stock = signal<Stock | null>(null);
  formConfig: FormConfig | null = null;

  private api     = inject(Api);
  private toast   = inject(Toast);
  private confirm = inject(ConfirmDialogService);
  private router  = inject(Router);
  private route   = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!id) return;

      this.stockId = id;

      this.api.show<Stock>('stock', id).subscribe({
        next: (data) => {
          this.stock.set(data);
          this.buildFormConfig(data); // ✅ build AFTER data arrives
        },
        error: () => this.toast.error('Failed to load stock data'),
      });
    });
  }

  buildFormConfig(data: Stock): void {
    this.formConfig = {
      fields: [
        {
          key: 'symbol',
          label: 'Stock Symbol',
          type: 'text',
          placeholder: 'AAPL',
          required: true,
          autoFocus: true,

          maxLength: 10,
          value: data.symbol,
          errorMessages: {
            required: 'Symbol is required',
            maxlength: 'Symbol cannot exceed 10 characters',
          },
        },
        {
          key: 'companyName',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Apple Inc.',
          required: true,
          maxLength: 255,
          value: data.companyName,
          errorMessages: {
            required: 'Company name is required',
            maxlength: 'Company name cannot exceed 255 characters',
          },
        },
        {
          key: 'purchase',
          label: 'Purchase Price',
          type: 'decimal',
          placeholder: '0.00',
          required: true,
          value: data.purchase,
          validators: [Validators.min(1), Validators.max(1000000000)],
          errorMessages: {
            required: 'Purchase price is required',
            min: 'Min value is 1',
            max: 'Max value is 1,000,000,000',
          },
        },
        {
          key: 'lastDiv',
          label: 'Last Dividend',
          type: 'decimal',
          placeholder: '0.00',
          required: true,
          value: data.lastDiv,
          validators: [Validators.min(0.001), Validators.max(100)],
          errorMessages: {
            required: 'Last dividend is required',
            min: 'Min value is 0.001',
            max: 'Max value is 100',
          },
        },
        {
          key: 'industry',
          label: 'Industry',
          type: 'text',
          placeholder: 'Technology',
          maxLength: 100,
          value: data.indeustry,
          errorMessages: {
            maxlength: 'Industry cannot exceed 100 characters',
          },
        },
        {
          key: 'marketCap',
          label: 'Market Cap',
          type: 'number',
          placeholder: '1,000,000,000',
          required: true,
          value: data.marketCap,
          validators: [Validators.min(1), Validators.max(5000000000)],
          errorMessages: {
            required: 'Market cap is required',
            min: 'Min value is 1',
            max: 'Max value is 5,000,000,000',
          },
        },
        {
          key: 'notes',
          label: 'Notes',
          type: 'textarea',
          rows: 4,
          value: data.notes,
        },
      ],
      submitLabel: 'Update Stock',
      submitIcon: 'pi pi-check',
      showReset: true,
    };
  }

  onSubmit(values: Record<string, any>, id: number): void {
    this.confirm.open({
      title:       'Confirm',
      message:     'Are you sure?',
      type:        'success',
      acceptLabel: 'Accept',
      rejectLabel: 'Cancel',
      accept: () => this.api.update('stock', id, values).subscribe({
        next:     (res)   => console.log(res),
        error:    (error) => this.toast.error(error?.error?.message ?? 'Something went wrong'),
        complete: ()      => this.toast.success('Updated successfully'),
      }),
    });
  }
}
