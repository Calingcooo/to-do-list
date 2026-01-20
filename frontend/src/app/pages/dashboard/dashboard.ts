import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, Tabs],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  taskflow: string = 'TaskFlow';
  selectedTab: string = 'pending'; // Default to 'pending' (To Do)

  ngOnInit(): void {
    // Load persisted tab from localStorage if available
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('app-tab');
      if (savedTab) {
        this.selectedTab = savedTab;
      }
    }
  }

  onTabChange(value: string): void {
    this.selectedTab = value;
    console.log('Tab changed to:', value);
  }
}
