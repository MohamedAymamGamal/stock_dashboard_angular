import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { inject } from '@angular/core';
import { of, timer } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {Api} from '../services/api';


export function AsyncValidators(): AsyncValidatorFn {
  return (control: AbstractControl): ReturnType<AsyncValidatorFn> => {
    const api = inject(Api);

    if (!control.value || control.value.trim() === '') {
      return of(null);
    }


    return timer(500).pipe(
      switchMap(() =>
        api.index(`account/register`).pipe(
          map((res: any) => (res.exists ? { emailExists: true } : null)),
          catchError(() => of(null))
        )
      )
    );
  };
}
