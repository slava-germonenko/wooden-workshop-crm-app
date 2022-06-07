import { Paging } from './paging';

export interface PagedResult<TItem> extends Paging {
  total: number;
  data: TItem[];
}
