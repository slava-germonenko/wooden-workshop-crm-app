import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { AuthorizationService, CurrentUserService, UsersService } from '@common/services';
import { VOID_FUNC } from '@common/constants';

export function appInitializerFactory(
  authService: AuthorizationService,
  currentUserService: CurrentUserService,
  usersService: UsersService,
): () => Observable<void> {
  return () => authService.refreshSession()
    .pipe(
      switchMap(({ accessToken }) => usersService.getUser(accessToken.userId)),
      tap((user) => currentUserService.startUserSession(user)),
      map(VOID_FUNC),
      catchError(() => of(undefined)),
    );
}
