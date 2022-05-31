import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedGuard } from '@common/route-guards';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@app/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
