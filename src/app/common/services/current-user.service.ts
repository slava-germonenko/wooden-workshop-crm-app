import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { NbToastrService } from '@nebular/theme';
import {
  Subscription,
  combineLatest,
  filter,
  interval,
  switchMap,
  tap,
  pluck,
} from 'rxjs';

import { currentUserStore } from '@common/stores';
import { User } from '@common/models/users';
import { AuthorizationService } from '@common/services';

const REFRESH_TOKEN_INTERVAL = 30000;

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly store = currentUserStore;

  private refreshTokenSubscription: Subscription;

  public readonly authorized$ = this.store.pipe(
    select(({ currentUser }) => currentUser !== null),
  );

  public readonly currentUser$ = this.store.pipe(
    pluck('currentUser'),
  );

  public constructor(
    private readonly authService: AuthorizationService,
    private readonly toastr: NbToastrService,
  ) {
    this.refreshTokenSubscription = combineLatest([this.authorized$, interval(REFRESH_TOKEN_INTERVAL)])
      .pipe(
        filter(([authorized]) => authorized),
        switchMap(() => this.authService.refreshSession()),
        tap({
          error: () => {
            this.toastr.danger('Произошла ошибка при попытке обновить сессию.', 'Ошибка авторизации');
            this.authService.logout().subscribe();
          },
        }),
      )
      .subscribe();
  }

  public startUserSession(user: User): void {
    this.setUserDetails(user);
  }

  public setUserDetails(currentUser: User): void {
    this.store.update((state) => ({ ...state, currentUser }));
  }
}
