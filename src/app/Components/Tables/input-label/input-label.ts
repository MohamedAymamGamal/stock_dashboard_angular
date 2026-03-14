import {AfterViewInit, Component, forwardRef, Input, ViewChild, ElementRef} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputType} from '../../../Types/InputType';
import { PasswordModule} from 'primeng/password';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-input-label',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    Textarea,
  ],
  templateUrl: './input-label.html',
  styleUrl: './input-label.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLabel),
      multi: true,
    },
  ]
})
export class InputLabel implements ControlValueAccessor ,AfterViewInit {
  @Input() type: InputType = 'text';
  @Input() label           = '';
  @Input() placeholder     = '';
  @Input() disabled        = false;
  @Input() required        = false;
  @Input() invalid         = false;
  @Input() errorMessage    = '';
  @Input() fullWidth       = true;
  @Input() autoFocus       = false;
  @Input() rows            = 3;

  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement> | undefined;

  readonly inputId = `input-${Math.random().toString(36).slice(2, 7)}`;


  ngAfterViewInit(): void {
    if (this.autoFocus) {
      setTimeout(() => this.inputRef?.nativeElement?.focus());
    }
  }
  value: any = '';
  onChange:  (v: any) => void = () => {};
  onTouched: ()       => void = () => {};

  writeValue(v: any): void         { this.value = v ?? ''; }
  registerOnChange(fn: any): void  { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(v: boolean): void { this.disabled = v; }
}
