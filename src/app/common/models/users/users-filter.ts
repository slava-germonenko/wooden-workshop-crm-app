import { Paging } from '@common/models/page';

export interface UsersFilter extends Paging {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  search?: string;
  active?: boolean;
}
