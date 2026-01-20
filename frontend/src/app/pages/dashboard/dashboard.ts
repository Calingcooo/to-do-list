import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { TaskCard } from '../../components/task-card/task-card';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, Tabs, TaskCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  taskflow: string = 'TaskFlow';
  selectedTab: string = 'pending';
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('app-tab');
      if (savedTab) {
        this.selectedTab = savedTab;
      }
    }

    this.authService.getUser();
  }

  onTabChange(value: string): void {
    this.selectedTab = value;
  }
}
