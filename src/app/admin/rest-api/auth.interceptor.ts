import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  public static readonly LOCAL_STORAGE_TOKEN_KEY = 'token';

  public constructor(protected router: Router) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = window.localStorage.getItem(AuthInterceptor.LOCAL_STORAGE_TOKEN_KEY) || '-';

    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // const token: string = event.headers.get('Authorization');
            // console.log(event.headers);
            // TODO investigate why response header is not visible and refresh it in localStorage
            // https://github.com/angular/angular/issues/18563
            // https://github.com/angular/angular/issues/20554
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            window.localStorage.removeItem(AuthInterceptor.LOCAL_STORAGE_TOKEN_KEY);
            this.router.navigate(['/admin']).then();
          }
        }
      )
    );
  }
}
