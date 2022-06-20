import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbAlertModule, NbButtonModule, NbCardModule, NbIconModule,
} from '@nebular/theme';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { FormModule } from '@framework/form';
import { FullNameModule } from '@framework/full-name';

import { UserInvitationsComponent } from './user-invitations.component';
import { UserInvitationsResolver } from './user-invitations.resolver';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    FormModule,
    FullNameModule,
    NbButtonModule,
    RouterModule.forChild([
      {
        path: ':uniqueToken',
        component: UserInvitationsComponent,
        resolve: {
          invitation: UserInvitationsResolver,
        },
      },
    ]),
    NbCardModule,
    NbAlertModule,
    NbIconModule,
  ],
  providers: [
    UserInvitationsResolver,
  ],
  declarations: [
    UserInvitationsComponent,
  ],
})
export class UserInvitationsModule { }
