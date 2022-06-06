import { Injectable, OnDestroy } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  Subscription,
  switchMap,
} from 'rxjs';
import { select } from '@ngneat/elf';

import { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_SIZE } from '@common/constants';
import { Paging } from '@common/models/page';
import { UsersService } from '@common/services';
import { UsersFilter } from '@common/models/users';

import {
  teamUsersStore,
  pushNewUsers,
  setFilters,
  setNextPagePending, setNewUsers,
} from './state';

@Injectable()
export class UsersStateService implements OnDestroy {
  private loadPageSubscription: Subscription;

  private readonly store = teamUsersStore;

  public readonly users$ = this.store.pipe(
    select((state) => state.users),
  );

  public readonly totalUsersCount$ = this.store.pipe(
    select((state) => state.totalUsersCount),
  );

  public get nextPageSnapshot(): Paging {
    const { users, resetPending } = this.store.state;
    return {
      offset: resetPending ? DEFAULT_PAGE_OFFSET : users.length,
      count: DEFAULT_PAGE_SIZE,
    };
  }

  public get nextPageUsersFilterSnapshot(): UsersFilter {
    return {
      ...this.nextPageSnapshot,
      ...this.store.state.filter,
    };
  }

  public constructor(private readonly usersService: UsersService) {
    this.loadPageSubscription = this.store
      .pipe(
        distinctUntilChanged((previous, current) => previous.nextPagePending === current.nextPagePending),
        filter((state) => state.nextPagePending),
        switchMap(() => this.usersService.getUsers(this.nextPageUsersFilterSnapshot)),
      )
      .subscribe((usersPage) => {
        this.store.update((state) => {
          return state.resetPending ? setNewUsers(state, usersPage) : pushNewUsers(state, usersPage);
        });
      });
  }

  public markAsPendingNextPage(): void {
    this.store.update(setNextPagePending);
  }

  public setFilters(filters: Omit<UsersFilter, 'count' | 'offset'>): void {
    this.store.update((state) => setFilters(state, filters));
  }

  public ngOnDestroy(): void {
    this.loadPageSubscription.unsubscribe();
  }
}
