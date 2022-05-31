import { Provider, Type } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';

export class InterceptorsProvider {
  public static provide<TInterceptor extends HttpInterceptor>(type: Type<TInterceptor>): Provider {
    return { provide: HTTP_INTERCEPTORS, multi: true, useClass: type };
  }
}
