/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { NoopInterceptor } from './noop-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { ErrorInterceptor } from './http-error-response.interceptor';
/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
