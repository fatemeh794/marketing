import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorDialogService} from '../services/error-dialog-service.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {
    // constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('tokenKey');

    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    // }

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
          data = {
            reason: error && error.error && error.error.reason ? error.error.reason : 'some error is occurred',
            status: error.status
          };
        }

        if (error.status === 401 || error.status === 403) {
          data = {
            reason: 'Unauthorized Request - Please login again',
            status: error.status
          };
        } else if (error.status === 500) {
          data = {
            reason: 'Error is occurred in server, We return soon',
            status: error.status
          };
        } else if (error.status === 0) {
          data = {
            reason: 'Check Internet or URL',
            status: error.status
          };
        } else {
          data = {
            reason: error && error.error  ? error.error : 'some error is occurred',
            status: error.status
          };
        }
        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}
