import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JwtService } from '../services';
import {Headers,RequestOptions} from "@angular/http";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
    //   'Content-Type': 'application/json',
    'Content-Type':'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    // const headersConfig = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    // headersConfig.set('Accept','application/json');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('appending headers');
    let options = new RequestOptions({ headers: headers });
    const token = this.jwtService.getToken();

    if (token) {
      headers.append('Authorization',`Token ${token}`);
      options = new RequestOptions({headers:headers});
      headersConfig['Authorization'] = `Token ${token}`;
      const authReq = req.clone({ setHeaders: headersConfig });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
