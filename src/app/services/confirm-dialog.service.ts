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
      icon:    this.getIcon(options.type),
      acceptLabel:            options.acceptLabel ?? 'Confirm',
      rejectLabel:            options.rejectLabel ?? 'Cancel',
      accept: () => options.accept?.(),
      reject: () => options.reject?.(),
    });
  }
  private getIcon(type: DialogType = 'default'): string {
    const icons: Record<DialogType, string> = {
      default: 'pi pi-question-circle',
      danger: 'pi pi-trash',
      warning: 'pi pi-exclamation-triangle',
      info: 'pi pi-info-circle',
      success: 'pi pi-check-circle',
    };
    return icons[type];

  }
}
