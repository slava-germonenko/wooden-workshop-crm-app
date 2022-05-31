import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import {
  AuthorizationService,
  CurrentUserService,
  NavigationService,
  UsersService,
} from '@common/services';
import { VOID_FUNC } from '@common/constants';

export function appInitializerFactory(
  authService: AuthorizationService,
  currentUserService: CurrentUserService,
  navigationService: NavigationService,
  usersService: UsersService,
): () => Observable<void> {
  return () => authService.refreshSession()
    .pipe(
      switchMap(({ accessToken }) => usersService.getUser(accessToken.userId)),
      tap((user) => {
        currentUserService.startUserSession(user);
        navigationService.setShowNavigation(true);
      }),
      map(VOID_FUNC),
      catchError(() => of(undefined)),
    );
}
