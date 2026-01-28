import type { Task } from './task.type';
export interface User {
  id: number;
  email: string;
  fullName: string;
  password: string;
  role: 'user' | 'admin';
  tasks: Task[];
  taskCount: number;
}
