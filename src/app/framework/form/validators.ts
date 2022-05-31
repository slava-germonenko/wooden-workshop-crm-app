import { Validators } from '@angular/forms';
import { FormFieldValidator } from '@framework/form/form-field-validator';

export const required = (message?: string): FormFieldValidator => {
  return {
    func: Validators.required,
    code: 'required',
    message,
  };
};

export const email = (message?: string): FormFieldValidator => {
  return {
    func: Validators.email,
    code: 'email',
    message,
  };
};
