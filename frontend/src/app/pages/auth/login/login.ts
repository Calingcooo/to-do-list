import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  async onSubmit(): Promise<void> {
    console.log('onSubmit called, isLoading:', this.isLoading);
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();
    console.log('isLoading set to true');

    try {
      await this.authService.login({
        email: this.email,
        password: this.password,
      });

      console.log('Logged in successfully');
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      console.error('Error caught:', err);
      this.errorMessage = err.message || 'Login failed';
      console.log('errorMessage set to:', this.errorMessage);
    } finally {
      console.log('Finally block executing');
      this.isLoading = false;
      this.cdr.detectChanges();
      console.log('isLoading set to false:', this.isLoading);
    }
  }
}
