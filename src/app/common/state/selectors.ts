import {
  distinctUntilChanged,
  map,
  OperatorFunction,
  pipe,
} from 'rxjs';

import { Paging } from '@common/models/page';
import { pagingsAreEqual } from '@common/helper-functions';

export function selectPaging<TState extends { page: Paging }>(): OperatorFunction<TState, Paging> {
  return pipe(
    map<TState, Paging>((state) => state.page),
    distinctUntilChanged(pagingsAreEqual),
  );
}
