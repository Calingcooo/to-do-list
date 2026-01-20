import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  onSubmit(): void {
    AuthService.login({ email, password })
      .then(() => console.log('Logged in'))
      .catch((err) => (this.errorMessage = err));
  }

  togglePasswordVisibility(): void {}
}
