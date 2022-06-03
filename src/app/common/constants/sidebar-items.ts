import { NbMenuItem } from '@nebular/theme';

export const PROFILE_SIDEBAR_ITEMS: NbMenuItem[] = [
  {
    title: 'Персональные данные',
    icon: 'person-outline',
    link: '/profile/personal-data',
  },
];

export const TEAM_SIDEBAR_ITEMS: NbMenuItem[] = [
  {
    title: 'Пользователи',
    icon: 'people-outline',
    link: '/team/users',
  },
  {
    title: 'Приглашения',
    icon: 'email-outline',
    link: '/team/invitations',
  },
];
