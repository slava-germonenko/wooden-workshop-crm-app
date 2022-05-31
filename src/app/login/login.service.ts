import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import {
  Observable,
  exhaustMap,
  map,
  tap,
} from 'rxjs';

import { VOID_FUNC } from '@common/constants';
import {
  ApiUrlsService,
  AuthorizationService,
  CurrentUserService,
  NavigationService,
  UsersService,
} from '@common/services';

@Injectable()
export class LoginService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly authService: AuthorizationService,
    private readonly currentUserService: CurrentUserService,
    private readonly navigationService: NavigationService,
    private readonly toastr: NbToastrService,
    private readonly usersService: UsersService,
  ) { }

  public login(username: string, password: string): Observable<void> {
    return this.authService.login(username, password)
      .pipe(
        exhaustMap(({ accessToken }) => this.usersService.getUser(accessToken.userId)),
        tap({
          error: (err: HttpErrorResponse) => {
            this.toastr.danger(
              err.error?.message ?? 'Произошла непредвиденная ошибка при попытке авторизации',
              'Ошибка авторизации',
            );
          },
          next: (user) => {
            this.currentUserService.startUserSession(user);
            this.navigationService.setShowNavigation(true);
          },
        }),
        map(VOID_FUNC),
      );
  }
}
