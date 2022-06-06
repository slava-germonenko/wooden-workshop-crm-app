import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

import { Invitation } from '@common/models/invitations';

import { ApiUrlsService } from './api-urls.service';

@Injectable({ providedIn: 'root' })
export class UserInvitationsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastr: NbToastrService,
  ) { }

  public sendNewUserInvitation(invitation: Pick<Invitation, 'emailAddress' | 'expireDate'>): Observable<Invitation> {
    const url = this.apiUrlsService.getUserInvitationsBaseEndpointUrl();
    return this.httpClient.post<Invitation>(url, invitation)
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
}
