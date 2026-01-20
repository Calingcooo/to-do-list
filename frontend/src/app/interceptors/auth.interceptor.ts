// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);
  const router = inject(Router);

  // const token = authService.getToken();
  const token = localStorage.getItem('auth_token') || '';

  let authReq = req;
  if (token && !req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq)
    .pipe
    // catchError((error) => {
    //   if (error.status === 401) {
    //     authService.logout();
    //     router.navigate(['/login']);
    //   }
    //   return throwError(() => error);
    // })
    ();
};
