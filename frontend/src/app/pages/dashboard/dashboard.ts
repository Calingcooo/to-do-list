import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { UserModal } from '../../components/user-modal/user-modal';
import type { Task } from '../../types/task.type';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Header,
    TaskBoard,
    UserCard,
    TaskCard,
    TaskModal,
    Tabs,
    ViewUserSidebar,
    UserModal,
  ],
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
  isUserModalOpen = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    public authService: AuthService,
    private taskService: TaskService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
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

  openUserModal() {
    this.isModalOpen = false;
    this.isUserModalOpen = true;
  }

  closeUserModal() {
    console.log('dashboard receiving event!');
    this.isUserModalOpen = false;
  }

  async onTaskDelete(task: Task) {
    const confirmed = confirm(`Are you sure you want to delete "${task.title}"?`);

    if (!confirmed) return;

    try {
      await this.taskService.deleteTask(task);

      if (this.selectedUser?.tasks) {
        this.selectedUser = {
          ...this.selectedUser,
          tasks: this.selectedUser.tasks.filter((t) => t.id !== task.id),
        };

        this.cdr.detectChanges();
      }

      await this.taskService.loadUserTasks();
    } catch (err: any) {
      alert(err.message || 'Failed to delete task');
    }
  }

  onTabChange(tab: string) {
    this.selectedTab = tab;
    this.loadDataForTab(tab);

    if (tab !== 'users') {
      this.isSidebarOpen = false;
      this.selectedUser = undefined!;
    }
  }

  async onTaskCreateForUser(task: Task) {
    if (!this.selectedUser) return;

    const taskToCreate = { ...task, user_id: this.selectedUser.id };

    const newTask = await this.taskService.createTask(taskToCreate);

    this.selectedUser = {
      ...this.selectedUser,
      tasks: [newTask, ...(this.selectedUser.tasks ?? [])],
    };

    const updatedUsers = this.userService
      .getUsers()
      .map((user) =>
        user.id === this.selectedUser!.id
          ? { ...user, tasks: [newTask, ...(user.tasks ?? [])] }
          : user,
      );
    this.userService['usersSubject'].next(updatedUsers);
    this.cdr.detectChanges();
  }

  async addNewUser(user: Event) {}
}
