import { UsersFilter } from '@common/models/users';

export function userFiltersAreEqual(
  f1: Omit<UsersFilter, 'offset' | 'count'>,
  f2: Omit<UsersFilter, 'offset' | 'count'>,
): boolean {
  return f1.active === f2.active && f1.search === f2.search;
}
