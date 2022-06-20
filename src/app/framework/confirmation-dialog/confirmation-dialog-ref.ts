import { NbDialogRef } from '@nebular/theme';
import { filter, Observable } from 'rxjs';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

export class ConfirmationDialogRef {
  public constructor(private readonly dialogRef: NbDialogRef<ConfirmationDialogComponent>) { }

  public afterConfirmed(): Observable<void | never> {
    return this.dialogRef.onClose
      .pipe(
        filter((confirmed) => confirmed),
      );
  }

  public afterClosed(): Observable<void> {
    return this.dialogRef.onClose;
  }

  public afterDeclined(): Observable<void | never> {
    return this.dialogRef.onClose
      .pipe(
        filter((confirmed) => !confirmed),
      );
  }

  public afterDismissed(): Observable<void | never> {
    return this.dialogRef.onClose
      .pipe(
        filter((confirmed) => confirmed === null || confirmed === undefined),
      );
  }
}
