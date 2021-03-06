import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private logiService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const url = req.url.split('/');
    if (url[1] != 'auth' && url[1] != 'externalauth') {
        // Get the auth token from the service.
        const authToken = this.logiService.getAccesToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
    return next.handle(req);

  }
}
