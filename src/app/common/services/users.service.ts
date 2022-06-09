import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

import { DEFAULT_PAGING } from '@common/constants';
import { mapToHttpParams } from '@common/helper-functions';
import { PagedResult } from '@common/models/page';
import { User, UsersFilter } from '@common/models/users';

import { ApiUrlsService } from './api-urls.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private get baseUsersUrl(): string {
    return this.apiUrlsService.getBaseUsersEndpointUrl();
  }

  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
    private readonly toastr: NbToastrService,
  ) { }

  public getUsers(usersFilter: UsersFilter = DEFAULT_PAGING): Observable<PagedResult<User>> {
    const params = mapToHttpParams(usersFilter);
    return this.httpClient.get<PagedResult<User>>(this.baseUsersUrl, { params });
  }

  public getUser(id: number): Observable<User> {
    const url = this.apiUrlsService.getUserDetailsEndpointUrl(id);
    return this.httpClient.get<User>(url);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(this.baseUsersUrl, user)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => this.toastr.danger(
            err.error?.message ?? 'Произошла непредвиденная ошибка при попытке обновить данные пользователя!',
            'Ошибка обновления пользователя',
          ),
        }),
      );
  }
}
