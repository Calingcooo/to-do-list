import type { User } from './user.type';

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
