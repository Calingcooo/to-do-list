export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  user_id: number;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}
