import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class Header {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Output() createTask = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  getUserInitials(): string {
    const user = this.authService.getUser();

    if (!user?.fullName) return 'UD';

    const names = user.fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.fullName.substring(0, 2).toUpperCase();
  }

  onAddTask() {
    this.createTask.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
