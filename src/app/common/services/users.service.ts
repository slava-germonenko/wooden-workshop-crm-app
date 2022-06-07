import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpClient.patch<User>(this.baseUsersUrl, user);
  }
}
