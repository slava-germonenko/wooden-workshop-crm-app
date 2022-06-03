import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule, NbToggleModule,
  NbUserModule,
} from '@nebular/theme';

import { FullNameModule } from '@framework/full-name';
import { TableListModule } from '@framework/table-list';

import { UsersComponent } from './users';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FullNameModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbUserModule,
    RouterModule.forChild(routes),
    TableListModule,
    NbToggleModule,
  ],
  declarations: [
    UsersComponent,
  ],
})
export class TeamModule { }
