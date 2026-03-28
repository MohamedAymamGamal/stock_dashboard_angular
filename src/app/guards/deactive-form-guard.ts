// core/guards/dirty-form.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogService } from '../services/confirm-dialog.service';

export interface DirtyFormComponent {
  isDirty(): boolean;
}

export const dirtyFormGuard: CanDeactivateFn<DirtyFormComponent> = (component) => {
  const dialog = inject(ConfirmDialogService);

  if (!component.isDirty()) return true;

  const result$ = new Subject<boolean>();

  dialog.open({
    title:       'Unsaved Changes',
    message:     'You have unsaved changes. Are you sure you want to leave?',
    type:        'warning',
    acceptLabel: 'Leave',
    rejectLabel: 'Stay',
    accept: () => result$.next(true),
    reject: () => result$.next(false),
  });

  return result$.asObservable();
};
