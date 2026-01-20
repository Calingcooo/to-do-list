import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    console.log('App loading, checking for user...');
    await this.authService.loadUser();
  }
}
