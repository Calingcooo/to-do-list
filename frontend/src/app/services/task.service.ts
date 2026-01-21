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

      console.log(response.tasks);

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

  async editTask(updatedTask: Partial<Task> & { id: number }): Promise<Task> {
    try {
      const observable$ = this.http.put<Task>(
        `${environment.apiUrl}/task/edit/${updatedTask.id}`,
        updatedTask,
        { headers: getAuthHeaders() },
      );

      const task = await lastValueFrom(observable$);

      const tasks = this.userTasksSubject.value.map((t) => (t.id === task.id ? task : t));
      this.userTasksSubject.next(tasks);

      return task;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Cannot update task';
      throw new Error(message);
    }
  }

  async createTask(taskData: Task): Promise<Task> {
    try {
      const observable$ = this.http.post<Task>(`${environment.apiUrl}/task/create`, taskData, {
        headers: getAuthHeaders(),
      });

      const task = await lastValueFrom(observable$);

      const tasks = this.userTasksSubject.value.map((t) => (t.id === task.id ? task : t));
      this.userTasksSubject.next(tasks);

      return task;
    } catch (error: any) {
      const message = error.error?.message || error.message || 'Cannot create new task';
      throw new Error(message);
    }
  }
}
