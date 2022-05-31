import { FormFieldType } from './form-field-type';
import { FormFieldValidator } from './form-field-validator';

export interface FormField {
  type: FormFieldType;
  id: string;
  label: string;
  placeholder?: string;
  validators?: FormFieldValidator[];
}
