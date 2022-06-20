import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { ConfirmationDialogRef } from '@framework/confirmation-dialog/confirmation-dialog-ref';
import { ConfirmationDialogComponent } from '@framework/confirmation-dialog/confirmation-dialog.component';

import { ConfirmConfig } from './confirm-config';
import { ConfirmationDialogModule } from './confirmation-dialog.module';

@Injectable({
  providedIn: ConfirmationDialogModule,
})
export class ConfirmationDialogService {
  public constructor(private readonly dialog: NbDialogService) { }

  public open(config: ConfirmConfig): ConfirmationDialogRef {
    const dialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        context: {
          config,
        },
      },
    );
    return new ConfirmationDialogRef(dialogRef);
  }
}
