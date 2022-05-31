import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';

import { InterceptorsProvider, WithAccessTokenInterceptor } from '@common/interceptors';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    NbButtonModule,
    NbInputModule,
    HttpClientModule,
    NbCardModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
  providers: [
    LoginService,
    InterceptorsProvider.provide(WithAccessTokenInterceptor),
  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule { }
