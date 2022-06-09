import { createStore, withProps } from '@ngneat/elf';
import { NbMenuItem } from '@nebular/theme';

export interface NavigationState {
  showSidebar: boolean;
  showToolbar: boolean;
  profileMenuItems: NbMenuItem[],
  sidebarItems: NbMenuItem[],
  toolbarItems: NbMenuItem[],
}

export const DEFAULT_NAVIGATION_STATE: NavigationState = {
  showSidebar: false,
  showToolbar: false,
  sidebarItems: [],
  toolbarItems: [
    {
      icon: 'people-outline',
      title: 'Команда',
      link: '/team',
    },
  ],
  profileMenuItems: [
    {
      icon: 'person-outline',
      title: 'Профиль',
      link: '/profile',
    },
    {
      icon: 'log-out-outline',
      title: 'Выход',
      link: '/logout',
    },
  ],
};

export const navigationStore = createStore(
  { name: 'navigation' },
  withProps<NavigationState>(DEFAULT_NAVIGATION_STATE),
);
