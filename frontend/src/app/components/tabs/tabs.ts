import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements OnInit, OnDestroy {
  @Input() value: string = 'pending';
  @Input() storageKey: string = 'app-tabs-selection'; // Unique key for localStorage
  @Input() persist: boolean = true; // Enable/disable persistence
  @Output() valueChange = new EventEmitter<string>();

  // Tab options
  tabs = [
    { value: 'pending', label: 'To Do' },
    { value: 'completed', label: 'Completed' },
  ];

  ngOnInit(): void {
    if (this.persist && typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(this.storageKey);
      if (savedValue && this.tabs.some((tab) => tab.value === savedValue)) {
        this.value = savedValue;
        this.valueChange.emit(savedValue);
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  selectTab(tabValue: string): void {
    this.value = tabValue;

    if (this.persist && typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, tabValue);
    }

    console.log({ tabValue, persisted: this.persist });
    this.valueChange.emit(tabValue);
  }

  // Optional: Method to clear persisted state
  clearPersistedState(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }
}
