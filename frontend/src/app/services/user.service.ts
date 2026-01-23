import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { getAuthHeaders } from '../utils/getAuthHeader.util';
import type { FetchUsersResponse } from '../types/response.type';
import type { Task } from '../types/task.type';
import type { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);

  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadUsers(): Promise<User[]> {
    const observable$ = this.http.get<FetchUsersResponse>(`${environment.apiUrl}/user/all`, {
      headers: getAuthHeaders(),
    });

    try {
      const response = await lastValueFrom(observable$);

      this.usersSubject.next(response.users);

      return response.users;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Cannot fetch user data';
      throw new Error(message);
    }
  }

  getUsers(): User[] {
    return this.usersSubject.value;
  }
}
