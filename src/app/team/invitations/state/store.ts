import { createStore, withProps } from '@ngneat/elf';

import { Invitation, InvitationsFilter } from '@common/models/invitations';

export interface TeamInvitationsState {
  filter: Omit<InvitationsFilter, 'count' | 'offset'>;
  totalInvitationsCount: number;
  invitations: Invitation[];
  nextPagePending: boolean;
  resetPending: boolean;
}

const DEFAULT_TEAM_USERS_STATE: TeamInvitationsState = {
  filter: {},
  totalInvitationsCount: 0,
  invitations: [],
  nextPagePending: true,
  resetPending: true,
};

export const teamInvitationsStore = createStore(
  { name: 'invitations' },
  withProps<TeamInvitationsState>(DEFAULT_TEAM_USERS_STATE),
);
