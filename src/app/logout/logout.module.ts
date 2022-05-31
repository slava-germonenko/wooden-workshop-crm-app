import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbSpinnerModule } from '@nebular/theme';

import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    NbSpinnerModule,
    RouterModule.forChild([
      { path: '', component: LogoutComponent },
    ]),
  ],
  declarations: [
    LogoutComponent,
  ],
})
export class LogoutModule { }
