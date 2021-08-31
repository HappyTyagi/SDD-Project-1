import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class HttpHeaderInterceptorService implements HttpInterceptor {
  public token: any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          ...(this.token && { 'token': this.token }),
       // ...this.token && 'token': this.token,
        })
      });
    return next.handle(request);
  }

}
