import { Invitation, InvitationsFilter } from '@common/models/invitations';
import { PagedResult } from '@common/models/page';

import { TeamInvitationsState } from './store';

export function setNewInvitations(
  state: TeamInvitationsState,
  invitationsPage: PagedResult<Invitation>,
): TeamInvitationsState {
  return {
    ...state,
    invitations: [...invitationsPage.data],
    totalInvitationsCount: invitationsPage.total,
    nextPagePending: false,
    resetPending: false,
  };
}

export function pushNewInvitations(
  state: TeamInvitationsState,
  invitationsPage: PagedResult<Invitation>,
): TeamInvitationsState {
  return {
    ...state,
    invitations: [...state.invitations, ...invitationsPage.data],
    totalInvitationsCount: invitationsPage.total,
    nextPagePending: false,
    resetPending: false,
  };
}

export function pushSingleInvitation(state: TeamInvitationsState, invitation: Invitation): TeamInvitationsState {
  return {
    ...state,
    totalInvitationsCount: state.totalInvitationsCount + 1,
    invitations: [invitation, ...state.invitations],
  };
}

export function setFilters(
  state: TeamInvitationsState,
  filter: Omit<InvitationsFilter, 'offset' | 'count'>,
): TeamInvitationsState {
  return {
    ...state,
    filter,
    nextPagePending: true,
    resetPending: true,
  };
}

export function setNextPagePending(state: TeamInvitationsState): TeamInvitationsState {
  return {
    ...state,
    nextPagePending: true,
  };
}

export function updateInvitationLocally(state: TeamInvitationsState, invitation: Invitation): TeamInvitationsState {
  const userToUpdateIndex = state.invitations.findIndex((u) => u.id === invitation.id);
  if (userToUpdateIndex < 0) {
    return state;
  }

  state.invitations.splice(userToUpdateIndex, 1, invitation);
  return { ...state, invitations: [...state.invitations] };
}
