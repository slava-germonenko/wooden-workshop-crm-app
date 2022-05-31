import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbContextMenuModule,
  NbGlobalPhysicalPosition,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbUserModule,
} from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';

import { FullNameModule } from '@framework/full-name';
import { InterceptorsProvider, WithAccessTokenInterceptor } from '@common/interceptors';
import {
  AuthorizationService,
  CurrentUserService,
  NavigationService,
  UsersService,
} from '@common/services';

import { appInitializerFactory } from './app-initializer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FullNameModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      duration: 5000,
      limit: 5,
    }),
    NbUserModule,
  ],
  providers: [
    InterceptorsProvider.provide(WithAccessTokenInterceptor),
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AuthorizationService, CurrentUserService, NavigationService, UsersService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
