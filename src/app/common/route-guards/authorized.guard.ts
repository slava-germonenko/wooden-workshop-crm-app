import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { CurrentUserService } from '@common/services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  public constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router,
  ) { }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.getAuthorizedObservable();
  }

  public canActivateChild(): Observable<boolean | UrlTree> {
    return this.getAuthorizedObservable();
  }

  private getAuthorizedObservable(): Observable<boolean | UrlTree> {
    return this.currentUserService.authorized$
      .pipe(
        map((authorized) => (authorized ? true : this.buildUrlTree())),
      );
  }

  private buildUrlTree(): UrlTree {
    return this.router.createUrlTree(['login']);
  }
}
