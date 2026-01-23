import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-board',
  imports: [CommonModule],
  templateUrl: './task-board.html',
})
export class TaskBoard {
  @Input() title!: string;
  @Output() create = new EventEmitter<void>();

  onAddTask() {
    this.create.emit();
  }
}
