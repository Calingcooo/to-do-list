import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: {
    type: string;
    name: string | null;
    token: string;
    abilities: string[];
    lastUsedAt: string | null;
    expiresAt: string | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('access_token'),
  );

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  async login(payload: { email: string; password: string }) {
    const observable$ = this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, payload);

    try {
      const data = await lastValueFrom(observable$);

      localStorage.setItem('access_token', data.token.token);
      this.isAuthenticatedSubject.next(true);

      return data;
    } catch (error: any) {
      console.error('AuthService error:', error);
      console.error('Error status:', error.status);
      console.error('Error response:', error.error);

      const message = error.error?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  }

  /**
   * LOGOUT
   */
  // logout(): void {
  //   localStorage.removeItem('access_token');
  //   this.isAuthenticatedSubject.next(false);
  //   this.router.navigate(['/login']);
  // }
}
