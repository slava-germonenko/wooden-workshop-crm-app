import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import {
  distinctUntilChanged,
  filter,
  Subscription,
  switchMap,
} from 'rxjs';

import { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_SIZE } from '@common/constants';
import { Invitation, InvitationsFilter } from '@common/models/invitations';
import { Paging } from '@common/models/page';
import { UserInvitationsService } from '@common/services';
import { UsersFilter } from '@common/models/users';
import { FormDialogService } from '@framework/form-dialog';

import {
  pushNewInvitations,
  pushSingleInvitation,
  setFilters,
  setNewInvitations,
  setNextPagePending,
  teamInvitationsStore,
  updateInvitationLocally,
} from './state';
import { INVITE_USER_DIALOG_CONFIG } from '../shared';

@Injectable()
export class InvitationsStateService {
  private loadPageSubscription: Subscription;

  private readonly store = teamInvitationsStore;

  public readonly loading$ = this.store.pipe(
    select((state) => state.nextPagePending),
  );

  public readonly invitations$ = this.store.pipe(
    select((state) => state.invitations),
  );

  public readonly totalInvitationsCount$ = this.store.pipe(
    select((state) => state.totalInvitationsCount),
  );

  public get nextPageSnapshot(): Paging {
    const { invitations, resetPending } = this.store.state;
    return {
      offset: resetPending ? DEFAULT_PAGE_OFFSET : invitations.length,
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
  ) {
    this.loadPageSubscription = this.store
      .pipe(
        distinctUntilChanged((previous, current) => previous.nextPagePending === current.nextPagePending),
        filter((state) => state.nextPagePending),
        switchMap(() => this.userInvitationsService.getUserInvitations(this.nextPageUsersFilterSnapshot)),
      )
      .subscribe((usersPage) => {
        this.store.update((state) => {
          return state.resetPending ? setNewInvitations(state, usersPage) : pushNewInvitations(state, usersPage);
        });
      });
  }

  public deactivateInvitation(invitation: Invitation): void {
    this.userInvitationsService.updateUserInvitation({ ...invitation, active: false })
      .subscribe((updatedInvitation) => {
        this.store.update((state) => updateInvitationLocally(state, updatedInvitation));
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
      .subscribe((invitation) => {
        this.store.update((state) => pushSingleInvitation(state, invitation));
      });
  }

  public resendInvitation(invitation: Invitation): void {
    this.userInvitationsService.updateUserInvitation({ ...invitation, active: false })
      .pipe(
        switchMap(({ emailAddress }) => this.userInvitationsService.sendUserInvitation({ emailAddress })),
      )
      .subscribe((newInvitation) => {
        this.store.update(
          (state) => updateInvitationLocally(state, { ...invitation, active: false }),
          (state) => pushSingleInvitation(state, newInvitation),
        );
      });
  }

  public setFilters(invitationsFilter: Omit<InvitationsFilter, 'offset' | 'count'>): void {
    this.store.update((state) => setFilters(state, invitationsFilter));
  }
}
