import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input({ required: true }) userView!: User;
  errorMessage = '';

  constructor(private userService: UserService) {}

  get roleClass(): string {
    switch (this.userView.role) {
      case 'admin':
        return 'bg-blue-100';

      case 'user':
        return 'bg-gray-100';
    }
  }
}
