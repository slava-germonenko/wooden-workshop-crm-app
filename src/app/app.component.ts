import { Component } from '@angular/core';

import { CurrentUserService, NavigationService } from '@common/services';

@Component({
  selector: 'ww-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly currentUser$ = this.currentUserService.currentUser$;

  public readonly profileMenuItems$ = this.navigationService.profileMenuItems$;

  public readonly showSidebar$ = this.navigationService.showSidebar$;

  public readonly showToolbar$ = this.navigationService.showToolbar$;

  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly navigationService: NavigationService,
  ) { }
}
