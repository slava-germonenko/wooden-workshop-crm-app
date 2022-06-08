import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { WW_FORM_DIALOG_CONFIG } from './constatns';
import { FormDialogConfig } from './form-dialog-config';

@Component({
  selector: 'ww-form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent {
  public readonly config: FormDialogConfig;

  public constructor(
    private readonly dialogRef: NbDialogRef<FormDialogComponent>,
    @Inject(WW_FORM_DIALOG_CONFIG) config: FormDialogConfig | null,
  ) {
    if (config) {
      this.config = config;
    } else {
      throw new Error('Form dialog config was not provided');
    }
  }

  public close(data: Record<string, any> | undefined): void {
    this.dialogRef.close(data);
  }
}
