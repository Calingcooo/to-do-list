import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input({ required: true }) userView!: User;
  @Output() select = new EventEmitter<User>();

  onSelect() {
    this.select.emit(this.userView);
  }

  errorMessage = '';

  constructor(private userService: UserService) {}

  get roleBadge(): string {
    switch (this.userView.role) {
      case 'admin':
        return 'bg-blue-100';

      case 'user':
        return 'bg-gray-100';

      default:
        return 'bg-gray-100';
    }
  }

  get roleClass(): string {
    switch (this.userView.role) {
      case 'admin':
        return 'bg-blue-100';

      case 'user':
        return 'bg-gray-100';
    }
  }

  onClickUser() {
    this.select.emit(this.userView);
  }
}
