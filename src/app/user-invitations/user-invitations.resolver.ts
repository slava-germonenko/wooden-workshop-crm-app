import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Invitation } from '@common/models/invitations';
import { UserInvitationsService } from '@common/services';

@Injectable()
export class UserInvitationsResolver implements Resolve<Invitation | null> {
  public constructor(
    private readonly invitationsService: UserInvitationsService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<Invitation | null> {
    const token = route.paramMap.get('uniqueToken');
    if (token === null) {
      return of(null);
    }
    return this.invitationsService.getUserInvitation(token)
      .pipe(
        catchError(() => of(null)),
      );
  }
}
