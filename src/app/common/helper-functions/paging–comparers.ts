import { Paging } from '@common/models/page';

export function pagingsAreEqual(p1: Paging, p2: Paging): boolean {
  return p1.offset === p2.offset && p1.count === p2.count;
}
