import type { User } from './user.type';
import type { Task } from './task.type';

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

export interface FetchCurrentUserResponse {
  success: boolean;
  data: User;
}

export interface FetchCurrentUserTasksResponse {
  tasks: Task[];
}

export interface FetchUsersResponse {
  users: User[];
}
