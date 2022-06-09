import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import { FormDialogModule } from '@framework/form-dialog';
import { FullNameModule } from '@framework/full-name';
import { TableListModule } from '@framework/table-list';

import { InvitationsComponent, InvitationsStateService } from './invitations';
import { UsersComponent, UsersStateService } from './users';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UsersComponent },
  { path: 'invitations', component: InvitationsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormDialogModule,
    FullNameModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbPopoverModule,
    NbToggleModule,
    NbUserModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableListModule,
  ],
  providers: [
    InvitationsStateService,
    UsersStateService,
  ],
  declarations: [
    InvitationsComponent,
    UsersComponent,
  ],
})
export class TeamModule { }
