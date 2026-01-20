import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLoggedIn = localStorage.getItem('access_token');

    if (isLoggedIn) {
      return true;
    }

    // Redirect to login if not authenticated
    return this.router.createUrlTree(['/login']);
  }
}
