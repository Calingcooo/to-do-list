import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements OnInit {
  @Input() value: string = 'my_task';
  @Output() valueChange = new EventEmitter<string>();

  tabs = [
    { value: 'my_task', label: 'My Tasks' },
    { value: 'users', label: 'Users' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      if (tab && this.tabs.some((t) => t.value === tab)) {
        this.value = tab;
      }
    });
  }

  selectTab(tabValue: string): void {
    this.value = tabValue;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabValue },
      queryParamsHandling: 'merge',
    });

    this.valueChange.emit(tabValue);
  }
}
