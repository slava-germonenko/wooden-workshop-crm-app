import { filter, Observable } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';

import { FormDialogComponent } from './form-dialog.component';

export class FormDialogRef {
  public constructor(private readonly dialogRef: NbDialogRef<FormDialogComponent>) { }

  public afterSubmit(): Observable<Record<string, any> | never> {
    return this.dialogRef.onClose
      .pipe(
        filter((data) => data),
      );
  }

  public afterCancel(): Observable<void | never> {
    return this.dialogRef.onClose
      .pipe(
        filter((data) => !data),
      );
  }
}
