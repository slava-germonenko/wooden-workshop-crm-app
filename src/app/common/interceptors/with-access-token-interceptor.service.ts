import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ACCESS_TOKEN_COOKIE_NAME } from '@common/constants';

@Injectable()
export class WithAccessTokenInterceptor implements HttpInterceptor {
  public constructor(private readonly cookieService: CookieService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.cookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    if (!accessToken) {
      return next.handle(req);
    }

    const reqWithAccessKey = req.clone({
      withCredentials: true,
      headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
    });

    return next.handle(reqWithAccessKey);
  }
}
