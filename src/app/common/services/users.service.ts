import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@common/models/users';

import { ApiUrlsService } from './api-urls.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getUser(id: number): Observable<User> {
    const url = this.apiUrlsService.getUserDetailsEndpointUrl(id);
    return this.httpClient.get<User>(url);
  }
}
