import {FormFieldConfig} from './FormFieldConfig ';

export interface FormConfig {
  fields: FormFieldConfig[];
  submitLabel?: string;
  submitIcon?: string;
  showReset?: boolean;
  resetLabel?: string;
}
