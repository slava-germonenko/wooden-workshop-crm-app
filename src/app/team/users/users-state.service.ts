import { Injectable, OnDestroy } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  Subscription,
  switchMap,
} from 'rxjs';
import { select } from '@ngneat/elf';

import { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_SIZE } from '@common/constants';
import { Invitation } from '@common/models/invitations';
import { Paging } from '@common/models/page';
import { UserInvitationsService, UsersService } from '@common/services';
import { User, UsersFilter } from '@common/models/users';
import { FormDialogService } from '@framework/form-dialog';

import {
  teamUsersStore,
  pushNewUsers,
  setFilters,
  setNextPagePending,
  setNewUsers, updateUserLocally,
} from './state';

import { INVITE_USER_DIALOG_CONFIG } from '../shared';

@Injectable()
export class UsersStateService implements OnDestroy {
  private loadPageSubscription: Subscription;

  private readonly store = teamUsersStore;

  public readonly loading$ = this.store.pipe(
    select((state) => state.nextPagePending),
  );

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

  public constructor(
    private readonly formDialogService: FormDialogService,
    private readonly userInvitationsService: UserInvitationsService,
    private readonly usersService: UsersService,
  ) {
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

  public openUserInvitationDialog(): void {
    this.formDialogService.open(INVITE_USER_DIALOG_CONFIG)
      .afterSubmit()
      .pipe(
        switchMap((invitation) => {
          return this.userInvitationsService.sendUserInvitation(
            invitation as Pick<Invitation, 'emailAddress'>,
          );
        }),
      )
      .subscribe();
  }

  public setFilters(filters: Omit<UsersFilter, 'count' | 'offset'>): void {
    this.store.update((state) => setFilters(state, filters));
  }

  public updateUserStatus(user: User, active: boolean): void {
    this.usersService.updateUser({ ...user, active })
      .subscribe((updatedUser) => this.store.update((state) => updateUserLocally(state, updatedUser)));
  }

  public ngOnDestroy(): void {
    this.loadPageSubscription.unsubscribe();
  }
}
