import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: { clone: (arg0: { setHeaders: { Authorization: string } }) => any },
    next: { handle: (arg0: any) => any }
  ) {
    const AUTH_SERVICE = this.injector.get(AuthService);
    const TOKENIZED_REQ = req.clone({
      setHeaders: {
        Authorization: `Bearer ${AUTH_SERVICE.getToken()}`,
      },
    });
    return next.handle(TOKENIZED_REQ);
  }
}
