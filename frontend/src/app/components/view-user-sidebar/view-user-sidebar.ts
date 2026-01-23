import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { User } from '../../types/user.type';

@Component({
  selector: 'app-view-user-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user-sidebar.html',
})
export class ViewUserSidebar {
  @Input() isOpen: boolean = false;
  @Input() selectedUser?: User;
  @Output() closeSidebar = new EventEmitter<void>();

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
}
