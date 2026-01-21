export type TaskStatus = 'todo' | 'pending' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  user_id: number;
}
