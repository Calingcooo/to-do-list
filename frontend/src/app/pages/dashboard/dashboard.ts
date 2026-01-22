import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Header } from '../../components/header/header';
import { TaskBoard } from '../../components/task-board/task-board';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskModal } from '../../components/task-modal/task-modal';
import type { User } from '../../types/user.type';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, TaskBoard, TaskCard, TaskModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  taskflow = 'TaskFlow';

  tasks$!: Observable<Task[]>;

  selectedTask!: Task;
  isModalOpen = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService.getUser();

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

  // saveTask(updatedTask: Task) {
  //   const index = this.tasks$.some((t) => t.id === updatedTask.id);
  //   if (index > -1) this.taskService.userTasks$[index] = updatedTask;
  // }

  // addTask(newTask: Task) {
  //   this.tasks.unshift(newTask);
  // }
}
