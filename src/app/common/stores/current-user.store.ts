import { createStore, withProps } from '@ngneat/elf';

import { User } from '@common/models/users';

export interface CurrentUserState {
  currentUser: User | null;
}

export const DEFAULT_CURRENT_USER_STATE : CurrentUserState = {
  currentUser: null,
};

export const currentUserStore = createStore(
  { name: 'currentUser' },
  withProps<CurrentUserState>(DEFAULT_CURRENT_USER_STATE),
);
