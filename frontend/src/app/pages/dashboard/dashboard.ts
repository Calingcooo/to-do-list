import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Header } from '../../components/header/header';
import { TaskBoard } from '../../components/task-board/task-board';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskModal } from '../../components/task-modal/task-modal';
import { UserCard } from '../../components/user-card/user-card';
import { Tabs } from '../../components/tabs/tabs';
import { ViewUserSidebar } from '../../components/view-user-sidebar/view-user-sidebar';
import type { Task } from '../../types/task.type';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, TaskBoard, UserCard, TaskCard, TaskModal, Tabs, ViewUserSidebar],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  selectedTab: string = 'my_task';
  taskflow = 'TaskFlow';
  selectedUser!: User;
  isSidebarOpen = false;

  tasks$!: Observable<Task[]>;
  users$!: Observable<User[]>;

  selectedTask!: Task;
  isModalOpen = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    public authService: AuthService,
    private taskService: TaskService,
    private userService: UserService,
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
    this.users$ = this.userService.users$;

    await this.loadDataForTab(this.selectedTab);
  }

  private async loadDataForTab(tab: string) {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (tab === 'my_task') {
        await this.taskService.loadUserTasks();
      }

      if (tab === 'users') {
        await this.userService.loadUsers();
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Something went wrong';
    } finally {
      this.isLoading = false;
    }
  }

  openUserSidebar(user: User) {
    if (this.selectedTab !== 'users') return;

    this.selectedUser = user;
    this.isSidebarOpen = true;
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
    this.selectedTab = tab;
    this.loadDataForTab(tab);

    if (tab !== 'users') {
      this.isSidebarOpen = false;
      this.selectedUser = undefined!;
    }
  }
}
