import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;
  @Output() statusChange = new EventEmitter<any>();
  @Output() edit = new EventEmitter<Task>();

  get statusClasses(): string {
    switch (this.task.status) {
      case 'todo':
        return 'bg-blue-50 border-blue-400';
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
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  onStatusChange() {
    this.statusChange.emit(this.task);
  }
}
