import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ACCESS_TOKEN_COOKIE_NAME } from '@common/constants';
import { getDeviceName } from '@common/helper-functions';
import { AccessToken, AuthResult } from '@common/models/auth';

import { ApiUrlsService } from './api-urls.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly cookieService: CookieService,
    private readonly httpClient: HttpClient,
  ) { }

  public login(username: string, password: string): Observable<AuthResult> {
    const url = this.apiUrlsService.getLoginEndpointUrl();
    return this.httpClient.post<AuthResult>(url, { username, password, deviceName: getDeviceName() })
      .pipe(
        tap(({ accessToken }) => this.setAccessTokenCookie(accessToken)),
      );
  }

  public refreshSession(): Observable<AuthResult> {
    const url = this.apiUrlsService.getRefreshSessionEndpointUrl();
    return this.httpClient.post<AuthResult>(url, {})
      .pipe(
        tap(({ accessToken }) => this.setAccessTokenCookie(accessToken)),
      );
  }

  public logout(): Observable<void> {
    const url = this.apiUrlsService.getLogoutEndpointUrl();
    return this.httpClient.post<void>(url, {});
  }

  private setAccessTokenCookie(accessToken: AccessToken): void {
    this.cookieService.set(ACCESS_TOKEN_COOKIE_NAME, accessToken.token);
  }
}
