import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    NbButtonModule,
    NbInputModule,
    HttpClientModule,
    NbCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginService,
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
