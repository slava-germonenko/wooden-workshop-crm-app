import { Paging } from '@common/models/page';

export interface InvitationsFilter extends Paging {
  search?: string;
  emailAddress?: string;
  active?: boolean;
  expired?: boolean;
}
