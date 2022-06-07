import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule, NbSpinnerModule,
  NbTagModule,
} from '@nebular/theme';

import { TableListComponent } from './table-list.component';

@NgModule({
  declarations: [
    TableListComponent,
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbIconModule,
    NbListModule,
    NbTagModule,
    NbSpinnerModule,
  ],
  exports: [
    TableListComponent,
  ],
})
export class TableListModule { }
