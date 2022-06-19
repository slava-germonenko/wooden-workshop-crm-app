import { Paging } from '@common/models/page';

export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_PAGE_OFFSET = 0;

export const DEFAULT_PAGING: Paging = {
  count: DEFAULT_PAGE_SIZE,
  offset: DEFAULT_PAGE_OFFSET,
};
