import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule } from '@nebular/theme';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
  ],
})
export class ConfirmationDialogModule { }
