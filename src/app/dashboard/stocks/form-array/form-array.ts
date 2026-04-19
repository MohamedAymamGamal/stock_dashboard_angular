import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import {Toast} from '../../../services/toast';
import {InputLabel} from '../../../Components/Tables/input-label/input-label';
import {Button} from '../../../Components/button/button';
@Component({
  selector: 'app-form-array',
  imports: [
    ReactiveFormsModule,
    InputLabel,
    Button,


  ],
  templateUrl: './form-array.html',
  styleUrl: './form-array.scss',
})
export class FormArrays  {
  form: FormGroup;

  constructor(private fb: FormBuilder,private toast: Toast) {
    this.form = this.fb.group({
      items: this.fb.array([]),
    });
  }

  get items() {
    return this.form.get('items') as FormArray;  // ← cast to FormArray
  }

  addItem() {
    this.items.push(this.fb.group({
      name: ['', Validators.required],
      qty:  [1],
    }));
  }

  removeItem(i: number) {
    this.items.removeAt(i);
  }
  // get productFormArr(){
  //   return this.items.controls as FormArrays;
  // }

  submit() {
    if(this.form.invalid){
      return this.form.reset();
    }
      this.toast.error('Please fill all fields');

    console.log(this.form.value);
  }

}
