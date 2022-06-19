import { createStore, withProps } from '@ngneat/elf';

import { User, UsersFilter } from '@common/models/users';

export interface TeamUsersState {
  filter: Omit<UsersFilter, 'count' | 'offset'>;
  totalUsersCount: number;
  users: User[];
  nextPagePending: boolean;
  resetPending: boolean;
}

const DEFAULT_TEAM_USERS_STATE: TeamUsersState = {
  filter: {},
  totalUsersCount: 0,
  users: [],
  nextPagePending: true,
  resetPending: true,
};

export const teamUsersStore = createStore(
  { name: 'users' },
  withProps<TeamUsersState>(DEFAULT_TEAM_USERS_STATE),
);
