import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../types/task.type';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.html',
})
export class TaskModal {
  @Input() task!: Task;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  @Output() create = new EventEmitter<Task>();

  tempTask!: Task;
  isSaving = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  get isCreateMode() {
    return !this.tempTask?.id;
  }

  ngOnChanges() {
    if (this.task) {
      const { userId, ...cleanTask } = this.task as any;
      this.tempTask = { ...cleanTask };
    }
  }

  async onSave() {
    if (!this.tempTask) return;
    this.isSaving = true;
    this.errorMessage = '';

    try {
      const updatedTask = await this.taskService.editTask(this.tempTask);

      this.save.emit(updatedTask);
      this.onClose();
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to save task';
      console.error('Error saving task:', err);
    } finally {
      this.isSaving = false;
    }
  }

  async onCreate() {
    if (!this.tempTask) return;
    this.isSaving = true;
    this.errorMessage = '';

    try {
      const newTask = await this.taskService.createTask(this.tempTask);
      this.create.emit(newTask);
      this.onClose();
    } catch (err: any) {
      this.errorMessage = err.message || 'Failed to create task';
      console.error('Error creating task:', err);
    } finally {
      this.isSaving = false;
    }
  }

  onClose() {
    this.isOpen = false;
    this.close.emit();
  }
}
