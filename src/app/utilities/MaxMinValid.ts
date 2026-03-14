import {AbstractControl, ValidationErrors} from '@angular/forms';
import {required} from '@angular/forms/signals';

export function  MaxMinValid(control: AbstractControl): ValidationErrors | null {

  const max = control.get('max')?.value;
  const min = control.get('min')?.value;


  return max === min ? null : {required: true};
}
