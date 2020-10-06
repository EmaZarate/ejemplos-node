import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private snackBar: MatSnackBar

    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap(evt => {
        }, (err: any) => {

            if (err instanceof HttpErrorResponse) {

                if (err.status == 401) {
                    // Unauthorized
                    localStorage.removeItem('auth_tokenn');
                    this.router.navigate(['/login']);
                }

                if (err.status == 500) {
                    this.snackBar.open(err.error, null, { duration: 2000 });
                }

                if (err.status == 403) {
                    this.snackBar.open(err.error, null, { duration: 2000 });
                }

                if (err.status == 400) {
                    this.snackBar.open(err.error, null, { duration: 2500 });
                }

                // //Status code 436 son las excepciones custom ejemplo UserNotFoundException
                // if (err.status == 436) {
                //     this.snackBar.open(err.message, 'Error', { duration: 2000 });
                // }
            }
        }));
    }
}
