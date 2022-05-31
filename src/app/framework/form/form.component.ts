import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormField } from './form-field';

@Component({
  selector: 'ww-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  public formGroup?: FormGroup;

  public fieldsInner: FormField[] = [];

  @Input()
  public set fields(fields: FormField[]) {
    this.formGroup = this.buildForm(fields);
    this.fieldsInner = fields;
  }

  @Input()
  public set value(value: Record<string, any> | null) {
    if (!this.formGroup) {
      return;
    }

    if (value) {
      this.formGroup.patchValue(value);
    } else {
      this.formGroup.reset();
    }
  }

  @Input()
  public cancelText = 'Отменить';

  @Input()
  public submitText = 'Подтвердить'

  @Input()
  public showCancel = false;

  @Input()
  public showSubmit = true;

  @Output()
  public wwSubmit = new EventEmitter<Record<string, any>>();

  @Output()
  public wwCancel = new EventEmitter<void>();

  public constructor(private readonly formBuilder: FormBuilder) { }

  public getErrorMessage(formFieldId: string): string | null {
    if (!this.formGroup || !this.formGroup.touched) {
      return null;
    }

    const control = this.formGroup?.get(formFieldId);
    const formField = this.fieldsInner.find((field) => field.id === formFieldId);
    if (!control || !formField) {
      throw Error(`Control ${formFieldId} not found in the form!`);
    }

    if (!formField.validators || !formField.validators.length) {
      return null;
    }

    const triggeredValidator = formField.validators.find(
      (validator) => control.hasError(validator.code),
    );

    return triggeredValidator?.message ?? null;
  }

  private buildForm(fields: FormField[]): FormGroup {
    const formGroupObject: Record<string, any> = {};
    fields.forEach((field) => {
      const validators = field.validators?.map((v) => v.func);
      formGroupObject[field.id] = ['', validators];
    })

    return this.formBuilder.group(formGroupObject);
  }
}
