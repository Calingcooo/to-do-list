import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-modal.html',
})
export class UserModal {
  @Output() closeModal = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  form = {
    fullName: '',
    email: '',
    role: '',
    password: '',
  };

  isSaving = false;
  errorMessage = '';

  close() {
    this.closeModal.emit();
  }

  submit() {
    if (!this.form.email || !this.form.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.create.emit(this.form);
  }
}
