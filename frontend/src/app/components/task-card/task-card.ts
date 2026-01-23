import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.html',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<any>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  get statusClasses(): string {
    switch (this.task.status) {
      case 'todo':
        return 'bg-blue-50 border border-gray-200 hover:border-gray-500';
      case 'pending':
        return 'bg-yellow-50 border-yellow-400';
      case 'completed':
        return 'bg-green-50 border-green-400';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  }

  get titleClasses(): string {
    switch (this.task.status) {
      case 'completed':
        return 'line-through text-gray-500';
      default:
        return 'text-gray-800';
    }
  }

  get badgeClasses(): string {
    switch (this.task.status) {
      case 'todo':
        return 'bg-blue-100 text-blue-700 hover:border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:border-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-700 hover:border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 hover:border-gray-300';
    }
  }

  async onStatusChange() {
    this.errorMessage = '';

    try {
      const updatedTask = await this.taskService.editTask(this.task);

      this.edit.emit(updatedTask);
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to save task';
      console.error('Error saving task:', err);
    }
  }

  onDelete(task: Task) {
    this.delete.emit(task);
  }
}
