import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  tempTask!: Task;

  ngOnChanges() {
    // Clone task to avoid editing the original until save
    if (this.task) {
      this.tempTask = { ...this.task };
    }
  }

  onSave() {
    this.save.emit(this.tempTask);
    this.onClose();
  }

  onClose() {
    this.isOpen = false;
    this.close.emit();
  }
}
