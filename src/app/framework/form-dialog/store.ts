import { createStore, withProps } from '@ngneat/elf';
import { FormDialogConfig } from '@framework/form-dialog/form-dialog-config';

export interface DialogsState {
  config: FormDialogConfig | null;
}

export const dialogsStore = createStore(
  { name: 'dialogs' },
  withProps<DialogsState>({ config: null }),
);
