import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormConfig} from '../../Types/FormConfig';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormFieldConfig} from '../../Types/FormFieldConfig ';
import {InputLabel} from '../Tables/input-label/input-label';
import {NgForOf, NgIf} from '@angular/common';
import {Button} from '../button/button';

@Component({
  selector: 'app-reusable-form',
  imports: [
    ReactiveFormsModule,
    InputLabel,
    NgForOf,
    Button,
    NgIf
  ],
  templateUrl: './reusable-form.html',
  styleUrl: './reusable-form.scss',
})
export class ReusableForm implements OnInit {
  @Input({required:true})  config!: FormConfig;
  @Output() formSubmit = new EventEmitter<Record<string, any>>();
  @Output() formReset = new EventEmitter<void>();

  form!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    const controls : Record<string, any> = {};
    for (const field of this.config.fields){
      const validators = field.validators ?? [];
      if(field.required){
        validators.push(Validators.required);
      }
      if(field.type === 'email') validators.push(Validators.email);

      controls[field.key] = [
        {value: '',disabled: field.disabled ?? false},validators
      ];
    }
    this.form = this.fb.group(controls);

  }

  isInvalid(key: string): boolean {
    const ctrl = this.form.get(key);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
  getError(field: FormFieldConfig): string {
    const ctrl = this.form.get(field.key);
    if (!ctrl || !ctrl.errors) return '';

    const messages: Record<string, string> = {
      required: `${field.label} is required`,
      email:    'Enter a valid email address',
      minlength: `Too short`,
      maxlength: `Too long`,
      ...field.errorMessages,
    };

    const firstError = Object.keys(ctrl.errors)[0];
    return messages[firstError] ?? 'Invalid value';
  }
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return ;

    setTimeout(() => {
      this.formSubmit.emit(this.form.getRawValue());
    }, 400);
  }

  onReset(): void {
    this.form.reset();
    this.formReset.emit();
  }



}
