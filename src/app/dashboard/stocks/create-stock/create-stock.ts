import {Component, inject} from '@angular/core';
import {FormConfig} from '../../../Types/FormConfig';
import {Validators} from '@angular/forms';
import {Api} from '../../../services/api';
import {Toast} from '../../../services/toast';
import {ReusableForm} from '../../../Components/reusable-form/reusable-form';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-create-stock',
  imports: [
    ReusableForm,
  ],
  templateUrl: './create-stock.html',
  styleUrl: './create-stock.scss',
})
export class CreateStock {

  private api = inject(Api);
  private toast = inject(Toast);
  private confirm  = inject(ConfirmDialogService);
  private router = inject(Router);
  formConfig: FormConfig = {
    fields: [
      {
        key: 'symbol',
        label: 'Stock Symbol',
        type: 'text',
        placeholder: 'AAPL',
        required: true,
        autoFocus: true,
        maxLength: 10,
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
        maxLength: 10,
        errorMessages: {
          required: 'Company name is required',
          maxlength: 'Company name cannot exceed 10 characters',
        },
      },
      {
        key: 'purchase',
        label: 'Purchase Price',
        type: 'decimal',
        placeholder: '0.00',
        required: true,
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
        maxLength: 10,
        value: '',

        errorMessages: {
          maxlength: 'Industry cannot exceed 10 characters',
        },
      },
      {
        key: 'marketCap',
        label: 'Market Cap',
        type: 'number',
        placeholder: '1,000,000,000',
        required: true,
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
      },
    ],

    submitLabel: 'Create Stock',
    submitIcon: 'pi pi-check',
    showReset: true,
  };

  onSubmit(values: Record<string, any>) {
    this.confirm.open({
      title:       'confirm',
      message:     'Are you sure :)',
      type:        'success',
      acceptLabel: 'accept',
      rejectLabel: 'Cancel',
      accept: () =>  this.api.store('stock',values).subscribe({
        next: values => {
          // setTimeout(() => {
          // },300);
          console.log(values)
        },
        error: error => {
          const message = error?.error()
          this.toast.error(message);
          console.log(error,message)
        },
        complete: () => {
          this.toast.success('created successfully');

        }
      })
    })


  }
}
