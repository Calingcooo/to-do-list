import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-board',
  imports: [CommonModule],
  templateUrl: './task-board.html',
})
export class TaskBoard {
  @Input() title!: string;
}
