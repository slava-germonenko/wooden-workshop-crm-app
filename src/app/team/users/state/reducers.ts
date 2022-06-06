import { PagedResult } from '@common/models/page';
import { User, UsersFilter } from '@common/models/users';

import { TeamUsersState } from './state';

export function setNewUsers(state: TeamUsersState, usersPage: PagedResult<User>): TeamUsersState {
  return {
    ...state,
    users: [...usersPage.data],
    totalUsersCount: usersPage.total,
    nextPagePending: false,
    resetPending: false,
  };
}

export function pushNewUsers(state: TeamUsersState, usersPage: PagedResult<User>): TeamUsersState {
  return {
    ...state,
    users: [...state.users, ...usersPage.data],
    totalUsersCount: usersPage.total,
    nextPagePending: false,
    resetPending: false,
  };
}

export function setFilters(state: TeamUsersState, filter: Omit<UsersFilter, 'offset' | 'count'>): TeamUsersState {
  return {
    ...state,
    filter,
    nextPagePending: true,
    resetPending: true,
  };
}

export function setNextPagePending(state: TeamUsersState): TeamUsersState {
  return {
    ...state,
    nextPagePending: true,
  };
}
