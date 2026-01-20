import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    debugger;
    const isLoggedIn = localStorage.getItem('auth_token');

    if (!isLoggedIn) {
      return true;
    }

    // Redirect to dashboard if already logged in
    return this.router.createUrlTree(['/dashboard']);
  }
}
