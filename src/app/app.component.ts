import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { distinctUntilChanged, map } from 'rxjs';

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

  public readonly darkThemeEnabled$ = this.themeService.onThemeChange()
    .pipe(
      map(() => this.themeService.currentTheme === 'dark'),
      distinctUntilChanged(),
    );

  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly navigationService: NavigationService,
    private readonly themeService: NbThemeService,
  ) { }
}
