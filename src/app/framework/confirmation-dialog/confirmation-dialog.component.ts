import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

import { ConfirmConfig } from './confirm-config';

@Component({
  selector: 'ww-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  // This is be set at confirm dialog service.
  public config: ConfirmConfig | null = null;

  public constructor(private readonly dialogRef: NbDialogRef<ConfirmationDialogComponent>) { }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public decline(): void {
    this.dialogRef.close(false);
  }
}
