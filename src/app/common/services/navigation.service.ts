import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { pluck } from 'rxjs';

import { navigationStore } from '@common/stores';
import { NbMenuItem } from '@nebular/theme';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly store = navigationStore;

  public profileMenuItems$ = this.store.pipe(
    pluck('profileMenuItems'),
  );

  public readonly showSidebar$ = this.store.pipe(
    select(({ showSidebar }) => showSidebar),
  );

  public readonly showToolbar$ = this.store.pipe(
    select(({ showToolbar }) => showToolbar),
  );

  public readonly sidebarItems$ = this.store.pipe(
    pluck('sidebarItems'),
  );

  public readonly toolbarItems$ = this.store.pipe(
    pluck('toolbarItems'),
  );

  public setShowNavigation(visible: boolean): void {
    this.store.update((state) => ({ ...state, showSidebar: visible, showToolbar: visible }));
  }

  public setSidebarItems(sidebarItems: NbMenuItem[]): void {
    this.store.update((state) => ({ ...state, sidebarItems}));
  }
}
