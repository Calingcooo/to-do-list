import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Header } from '../../components/header/header';
import { TaskBoard } from '../../components/task-board/task-board';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskModal } from '../../components/task-modal/task-modal';
import { Tabs } from '../../components/tabs/tabs';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, TaskBoard, TaskCard, TaskModal, Tabs],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  selectedTab: string = 'my_task';
  taskflow = 'TaskFlow';

  tasks$!: Observable<Task[]>;

  selectedTask!: Task;
  isModalOpen = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    public authService: AuthService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.getUser();

    const tabParam = this.route.snapshot.queryParamMap.get('tab');
    this.selectedTab = tabParam ?? 'my_task';

    if (!tabParam) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab: this.selectedTab },
        queryParamsHandling: 'merge',
      });
    }

    this.tasks$ = this.taskService.userTasks$;

    this.isLoading = true;
    try {
      await this.taskService.loadUserTasks();
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to load tasks';
    } finally {
      this.isLoading = false;
    }
  }

  openCreateModal() {
    this.selectedTask = {
      title: '',
      description: '',
      status: 'todo',
    } as Task;

    this.isModalOpen = true;
  }

  openEditModal(task: Task) {
    this.selectedTask = { ...task };
    this.isModalOpen = true;
  }

  onTabChange(tab: string) {
    console.log('value change!!');
    this.selectedTab = tab;
  }
}
