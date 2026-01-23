import { HttpHeaders } from '@angular/common/http';

export function getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('access_token');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
}
