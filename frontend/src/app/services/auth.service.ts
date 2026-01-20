import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import api from '../api/axios';

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

  constructor(private router: Router) {}

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/login', payload);
    localStorage.setItem('access_token', res.data.token.token);
    return res.data;
  }

  /**
   * LOGOUT
   */
  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * TOKEN HELPER
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
