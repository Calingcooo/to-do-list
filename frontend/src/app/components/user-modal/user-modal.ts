import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.html',
})
export class UserModal {
  @Output() closeModal = new EventEmitter<void>();

  form: Partial<User> = {
    fullName: '',
    email: '',
    role: 'user',
    password: '',
  };

  isSaving = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  close() {
    this.closeModal.emit();
  }

  async submit() {
    if (!this.form.email || !this.form.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    try {
      await this.userService.createUser(this.form);

      this.close();
      this.cdr.detectChanges();
    } catch (error: any) {
      this.errorMessage = error?.message || 'Failed to create user.';
      this.cdr.detectChanges();
    }
  }
}
