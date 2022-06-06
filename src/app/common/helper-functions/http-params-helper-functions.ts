import { HttpParams } from '@angular/common/http';

const QUERY_PARAMS_TYPES = ['string', 'number', 'boolean'];

export function mapToHttpParams<T extends object>(source: T): HttpParams {
  const paramsObject: Record<string, string | boolean | number> = {};
  Object.getOwnPropertyNames(source).forEach((paramName) => {
    // @ts-ignore
    const paramValue = source[paramName];
    if (paramValue !== undefined && paramValue !== null && QUERY_PARAMS_TYPES.includes(typeof paramValue)) {
      paramsObject[paramName] = paramValue;
    }
  });

  return new HttpParams({ fromObject: paramsObject });
}
