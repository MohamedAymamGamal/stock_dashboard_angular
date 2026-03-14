import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonType,ButtonSeverity} from '../../Types/ButtonType';
import {ButtonModule} from 'primeng/button';
@Component({
  selector: 'app-button',
  imports: [
    ButtonModule
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone : true
})
export class Button {
  @Input({required:true}) label: string = '';
  @Input({required:true}) type: ButtonType = 'button';
  @Input() severity: ButtonSeverity = 'primary';
  @Input() icon = '';
  @Input() loading = false;
  @Input() disabled = false;

  @Output() onClick = new EventEmitter<void>();
}
