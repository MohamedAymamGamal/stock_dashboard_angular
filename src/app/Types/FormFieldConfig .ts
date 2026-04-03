import {InputType} from './InputType';

export interface FormFieldConfig {
  key: string;
  label: string;
  type: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  rows?: number;
  validators?: any[];
  errorMessages?: Record<string, string>;
  maxLength?: number;
  minLength?: number;
  isDirty?: boolean;
  value?: any;
}
