import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url.includes('https://accounts.spotify.com/api/token')) {
        return next.handle(req);
    }

    if(req.url.includes('https://accounts.spotify.com/authorize')){
        return next.handle(req);
    }

    var token = this.auth.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(authReq);
  }
}