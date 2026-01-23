import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';
import type { User } from '../../types/user.type';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-view-user-sidebar',
  standalone: true,
  imports: [CommonModule, TaskCard],
  templateUrl: './view-user-sidebar.html',
})
export class ViewUserSidebar {
  @Input() isOpen: boolean = false;
  @Input() selectedUser?: User;
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() createTask = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  selectedStatus: 'todo' | 'pending' | 'completed' = 'todo';

  get filteredTasks() {
    if (!this.selectedUser) return [];

    return this.selectedUser.tasks?.filter((task) => task.status === this.selectedStatus) ?? [];
  }

  toggleSideBar() {
    this.closeSidebar.emit();
  }

  setStatus(status: 'todo' | 'pending' | 'completed') {
    this.selectedStatus = status;
  }

  onAddTaskForUser() {
    this.createTask.emit();
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(task: Task) {
    this.delete.emit(task);
  }
}
