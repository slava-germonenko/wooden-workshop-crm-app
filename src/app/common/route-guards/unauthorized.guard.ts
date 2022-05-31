import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { CurrentUserService } from '@common/services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UnauthorizedGuard implements CanActivate, CanActivateChild {
  private readonly unauthorized$ = this.currentUserService.authorized$.pipe(
    map((authorized) => !authorized),
    tap(console.log),
  );

  public constructor(private readonly currentUserService: CurrentUserService) { }

  public canActivate(): Observable<boolean> {
    return this.unauthorized$;
  }

  public canActivateChild(): Observable<boolean> {
    return this.unauthorized$;
  }
}
