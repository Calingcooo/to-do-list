import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { getAuthHeaders } from '../utils/getAuthHeader.util';
import type { LoginResponse, FetchCurrentUserResponse } from '../types/response.type';
import type { User } from '../types/user.type';

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('access_token'),
  );

  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  async loadUser(): Promise<void> {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
        }

        const freshUser = await this.fetchCurrentUser();
        this.currentUserSubject.next(freshUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
  }

  async login(payload: LoginRequest) {
    const observable$ = this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, payload);

    try {
      const data = await lastValueFrom(observable$);

      localStorage.setItem('access_token', data.token.token);
      this.isAuthenticatedSubject.next(true);

      await this.fetchCurrentUser();

      return data;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  }

  async fetchCurrentUser(): Promise<User> {
    const observable$ = this.http.get<FetchCurrentUserResponse>(`${environment.apiUrl}/auth/me`, {
      headers: getAuthHeaders(),
    });

    try {
      const user = await lastValueFrom(observable$);
      this.currentUserSubject.next(user.data);
      console.log({ user });

      localStorage.setItem('user_data', JSON.stringify(user.data));

      return user.data;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Cannot fetch user data';
      throw new Error(message);
    }
  }

  getUser(): User | null {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
