import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { CurrentUserService } from '@common/services';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  public constructor(private readonly currentUserService: CurrentUserService) { }

  public canActivate(): Observable<boolean> {
    return this.currentUserService.authorized$;
  }

  public canActivateChild(): Observable<boolean> {
    return this.currentUserService.authorized$;
  }
}
