import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
