import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getAuthHeaders } from '../utils/getAuthHeader.util';
import type { FetchCurrentUserTasksResponse } from '../types/response.type';
import type { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private userTasksSubject = new BehaviorSubject<Task[]>([]);

  userTasksSubject$ = this.userTasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  async loadUserTasks(): Promise<Task[]> {
    const observable$ = this.http.get<FetchCurrentUserTasksResponse>(
      `${environment.apiUrl}/task/user-tasks`,
      { headers: getAuthHeaders() },
    );

    try {
      const response = await lastValueFrom(observable$);

      this.userTasksSubject.next(response.tasks);

      return response.tasks;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Cannot fetch user data';
      throw new Error(message);
    }
  }

  getTasks(): Task[] {
    return this.userTasksSubject.value;
  }
}
