import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { FormModule } from '@framework/form';

import { PersonalDataComponent, PersonalDataService } from './personal-data';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personal-data',
  },
  {
    path: 'personal-data',
    component: PersonalDataComponent,
  },
];

@NgModule({
  imports: [
    FormModule,
    NbCardModule,
    NbSpinnerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PersonalDataService,
  ],
  declarations: [
    PersonalDataComponent,
  ],
})
export class ProfileModule { }
