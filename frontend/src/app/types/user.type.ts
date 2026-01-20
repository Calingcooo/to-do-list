export interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
}
