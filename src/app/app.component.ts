import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NbMenuComponent, NbMenuItem } from '@nebular/theme';

import { EMPTY_ARRAY } from '@common/constants';
import { CurrentUserService, NavigationService } from '@common/services';

@Component({
  selector: 'ww-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('menu')
  public menu?: NbMenuComponent;

  public readonly currentUser$ = this.currentUserService.currentUser$;

  public readonly profileMenuItems$ = this.navigationService.profileMenuItems$;

  public readonly showSidebar$ = this.navigationService.showSidebar$;

  public readonly showToolbar$ = this.navigationService.showToolbar$;

  public readonly toolbarItem$ = this.navigationService.toolbarItems$;

  public sidebarItems: NbMenuItem[] = EMPTY_ARRAY;

  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly navigationService: NavigationService,
  ) { }

  public ngAfterViewInit(): void {
    this.navigationService.sidebarItems$.subscribe((sidebarItems) => {
      this.sidebarItems = sidebarItems;
      this.menu?.ngAfterViewInit();
    });
  }
}
