import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PROFILE_SIDEBAR_ITEMS, TEAM_SIDEBAR_ITEMS } from '@common/constants';
import { SidebarItemsResolver } from '@common/resolvers';
import { AuthorizedGuard, UnauthorizedGuard } from '@common/route-guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'login',
    loadChildren: () => import('@app/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthorizedGuard],
  },
  {
    path: 'logout',
    loadChildren: () => import('@app/logout/logout.module').then((m) => m.LogoutModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('@app/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthorizedGuard],
    resolve: [SidebarItemsResolver],
    data: {
      sidebar: PROFILE_SIDEBAR_ITEMS,
    },
  },
  {
    path: 'team',
    loadChildren: () => import('@app/team/team.module').then((m) => m.TeamModule),
    canActivate: [AuthorizedGuard],
    resolve: [SidebarItemsResolver],
    data: {
      sidebar: TEAM_SIDEBAR_ITEMS,
    },
  },
  {
    path: 'user-invitations',
    loadChildren: () => import('@app/user-invitations/user-invitations.module').then((m) => m.UserInvitationsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
