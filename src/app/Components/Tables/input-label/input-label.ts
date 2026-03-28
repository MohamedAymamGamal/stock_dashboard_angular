import {AfterViewInit, Component, forwardRef, Input, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputType} from '../../../Types/InputType';
import { PasswordModule} from 'primeng/password';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {Textarea} from 'primeng/textarea';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'app-input-label',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    Textarea,
    ProgressBar,
  ],
  templateUrl: './input-label.html',
  styleUrl: './input-label.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
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
  @Input() maxLength: number | null = null;


  @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement> | undefined;

  readonly inputId = `input-${Math.random().toString(36).slice(2, 7)}`;

  get isOverLimit(): boolean {

    if (!this.maxLength) return false;
    return String(this.value ?? '').length > this.maxLength;
  }

  get charPercent(): number {

    if (!this.maxLength) return 0;
    const len = String(this.value ?? '').length;
    return Math.min((len / this.maxLength) * 100, 100);
  }

  get charCountColor(): 'normal' | 'warning' | 'danger' {
    if (!this.maxLength) return 'normal';
    const ratio = this.charPercent / 100;
    if (ratio >= 1)   return 'danger';
    if (ratio >= 0.8) return 'warning';
    return 'normal';
  }
  get progressBarClass(): string {
    const map = {
      normal:  'progress-normal',
      warning: 'progress-warning',
      danger:  'progress-danger',
    };
    return map[this.charCountColor];
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      setTimeout(() => this.inputRef?.nativeElement?.focus());
    }
  }
  touched = false;
  value: any = '';
  onChange:  (v: any) => void = () => {};
  onTouched: ()       => void = () => {};
  onValueChange(val: any): void {
    this.value = val;
    this.onChange(val);   // notifies the form control
    this.onTouched();
    this.touched = true;
  }
  writeValue(v: any): void         { this.value = v ; }
  registerOnChange(fn: any): void  { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(v: boolean): void { this.disabled = v; }
}
