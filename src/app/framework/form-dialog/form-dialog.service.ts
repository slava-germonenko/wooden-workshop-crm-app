import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { FormDialogRef } from './form-dialog-ref';
import { FormDialogComponent } from './form-dialog.component';
import { FormDialogConfig } from './form-dialog-config';
import { dialogsStore } from './store';

@Injectable()
export class FormDialogService {
  private readonly store = dialogsStore;

  public constructor(
    private readonly dialogService: NbDialogService,
  ) { }

  public open(config: FormDialogConfig): FormDialogRef {
    this.store.update((state) => ({ ...state, config }));
    const ref = this.dialogService.open(FormDialogComponent);
    return new FormDialogRef(ref);
  }
}
