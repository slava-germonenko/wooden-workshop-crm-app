import {
  EMPTY,
  of,
  OperatorFunction,
  pipe,
  switchMap,
} from 'rxjs';

export function excludeNulls<T>(): OperatorFunction<T | null, T> {
  return pipe(
    switchMap((data: T | null) => (data === null ? EMPTY : of(data))),
  );
}
