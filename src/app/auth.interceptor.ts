import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.sharedService.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}