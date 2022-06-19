import { NgModule } from '@angular/core';
import { NbCardModule, NbDialogModule } from '@nebular/theme';

import { FormModule } from '@framework/form';

import { FormDialogComponent } from './form-dialog.component';
import { FormDialogService } from './form-dialog.service';
import { WW_FORM_DIALOG_CONFIG } from '@framework/form-dialog/constatns';
import { dialogsStore } from '@framework/form-dialog/store';

@NgModule({
  imports: [
    FormModule,
    NbCardModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    FormDialogService,
    {
      provide: WW_FORM_DIALOG_CONFIG,
      useFactory: () => dialogsStore.state.config,
    },
  ],
  declarations: [
    FormDialogComponent,
  ],
})
export class FormDialogModule { }
