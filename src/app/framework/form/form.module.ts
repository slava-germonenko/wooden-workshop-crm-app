import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbInputModule } from '@nebular/theme';

import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormComponent,
  ],
  exports: [
    FormComponent,
  ],
})
export class FormModule { }
