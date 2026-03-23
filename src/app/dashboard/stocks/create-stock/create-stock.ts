import {Component, inject} from '@angular/core';
import {FormConfig} from '../../../Types/FormConfig';
import {Validators} from '@angular/forms';
import {Api} from '../../../services/api';
import {Toast} from '../../../services/toast';
import {ReusableForm} from '../../../Components/reusable-form/reusable-form';

@Component({
  selector: 'app-create-stock',
  imports: [
    ReusableForm
  ],
  templateUrl: './create-stock.html',
  styleUrl: './create-stock.scss',
})
export class CreateStock {
  private api = inject(Api);
  private toast = inject(Toast);
  formConfig: FormConfig = {
    fields: [
      {
        key: 'symbol',
        label: 'Stock Symbol',
        type: 'text',
        placeholder: 'AAPL',
        autoFocus: true,
      },
      {
        key: 'companyName',
        label: 'Company Name',
        type: 'text',
        placeholder: 'Apple Inc.',
      },
      {
        key: 'purchase',
        label: 'Purchase Price',
        type: 'number',
        placeholder: '0.00',

      },
      {
        key: 'lastDiv',
        label: 'Last Dividend',
        type: 'number',
        placeholder: '0.00',
      },
      {
        key: 'indeustry ',
        label: 'Industry',
        type: 'text',
        placeholder: 'Technology',
      },
      {
        key: 'marketCap',
        label: 'Market Cap',
        type: 'number',
        placeholder: '1000000',
      },
      {
        key: 'notes',
        label: 'Notes',
        type: 'textarea',
        rows: 4,
      },
    ],

    submitLabel: 'Create Stock',
    submitIcon: 'pi pi-check',
    showReset: true,
  };

  onSubmit(values: Record<string, any>) {
    this.api.store('stock',values).subscribe({
      next: values => {
        setTimeout(() => {
          this.toast.success('created successfully');
        },300);
      },
      error: error => {
        this.toast.error('failed to create');
      }
    })
  }
}
