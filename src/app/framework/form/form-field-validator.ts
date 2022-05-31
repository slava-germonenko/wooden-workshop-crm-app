import { ValidatorFn } from '@angular/forms';

export interface FormFieldValidator {
  code: string;
  func: ValidatorFn,
  message?: string;
}
