import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

import { mapToHttpParams } from '@common/helper-functions';
import { Invitation, InvitationsFilter } from '@common/models/invitations';
import { PagedResult } from '@common/models/page';

import { ApiUrlsService } from './api-urls.service';

@Injectable({ providedIn: 'root' })
export class UserInvitationsService {
  private get userInvitationsUrl(): string {
    return this.apiUrlsService.getUserInvitationsBaseEndpointUrl();
  }

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastr: NbToastrService,
  ) { }

  public getUserInvitations(filter: InvitationsFilter): Observable<PagedResult<Invitation>> {
    const params = mapToHttpParams(filter);
    return this.httpClient.get<PagedResult<Invitation>>(this.userInvitationsUrl, { params });
  }

  public sendUserInvitation(invitation: Pick<Invitation, 'emailAddress'>): Observable<Invitation> {
    return this.httpClient.post<Invitation>(this.userInvitationsUrl, invitation)
      .pipe(
        tap({
          next: () => this.toastr.success(
            `Письмо с приглашением было успешно отправлено на адрес "${invitation.emailAddress}".`,
            'Приглашение отправлено.',
          ),
          error: (err: HttpErrorResponse) => this.toastr.danger(
            err.error?.message ?? 'Произошла непредвиденная ошибка при попытке отправить приглашение!',
            'Ошибка отправки приглашения',
          ),
        }),
      );
  }

  public updateUserInvitation(invitation: Invitation): Observable<Invitation> {
    return this.httpClient.patch<Invitation>(this.userInvitationsUrl, invitation);
  }
}
