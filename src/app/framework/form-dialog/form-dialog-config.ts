import { FormField } from '@framework/form';

export interface FormDialogConfig {
  cancelText?: string;
  formFields: FormField[];
  value?: Record<string, any>;
  submitText?: string;
  showCancel?: boolean;
  showSubmit?: boolean;
  title: string;
}
