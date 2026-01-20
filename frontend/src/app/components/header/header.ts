import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() userFullName: string = 'John Doe';
  @Input() userEmail: string = 'john@example.com';
  @Input() userRole: string = 'user'; // 'admin' or 'user'
  @Output() onLogout = new EventEmitter<void>();

  constructor(private router: Router) {}

  getUserInitials(): string {
    // Get first letters of first and last name
    const names = this.userFullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return this.userFullName.substring(0, 2).toUpperCase();
  }

  logout(): void {
    this.onLogout.emit();
    // Optional: Add navigation
    // this.router.navigate(['/login']);
  }
}
