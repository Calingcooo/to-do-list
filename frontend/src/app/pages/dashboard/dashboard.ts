import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { TaskCard } from '../../components/task-card/task-card';
import type { User } from '../../types/user.type';
import type { Task } from '../../types/task.type';

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
  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('app-tab');
      if (savedTab) {
        this.selectedTab = savedTab;
      }
    }

    this.authService.getUser();
    await this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    try {
      this.tasks = await this.taskService.loadUserTasks();
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to load tasks';
      console.error('Error loading tasks:', err);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  onTabChange(value: string): void {
    this.selectedTab = value;
  }
}
