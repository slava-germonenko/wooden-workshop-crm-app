import { createStore, withProps } from '@ngneat/elf';
import { NbMenuItem } from '@nebular/theme';

export interface NavigationState {
  showSidebar: boolean;
  showToolbar: boolean;
  sidebarItems: NbMenuItem[],
  profileMenuItems: NbMenuItem[],
}

export const DEFAULT_NAVIGATION_STATE: NavigationState = {
  showSidebar: false,
  showToolbar: false,
  sidebarItems: [],
  profileMenuItems: [],
};

export const navigationStore = createStore(
  { name: 'navigation' },
  withProps<NavigationState>(DEFAULT_NAVIGATION_STATE),
);