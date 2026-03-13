import { Injectable } from '@angular/core';
import { ConfirmationService } from "primeng/api";
import {ConfirmOptions, DialogType} from '../Types/confirm-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {


  constructor(private service: ConfirmationService
  ) {}

  open(options: ConfirmOptions): void {
    this.service.confirm({
      header:  options.title,
      message: options.message,
      acceptLabel:            options.acceptLabel ?? 'Confirm',
      rejectLabel:            options.rejectLabel ?? 'Cancel',
      accept: () => options.accept?.(),
      reject: () => options.reject?.(),
    });
  }



}
