import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-environment-test',
  template: `
    <div class="p-4 border rounded-lg">
      <h3 class="font-bold mb-2">Environment Variables</h3>
      <ul class="text-sm">
        <li><strong>API URL:</strong> {{ apiUrl }}</li>
        <li><strong>Production:</strong> {{ isProduction }}</li>
        <li><strong>Environment:</strong> {{ environmentName }}</li>
      </ul>
    </div>
  `,
})
export class EnvironmentTestComponent {
  apiUrl = environment.apiUrl;
  isProduction = environment.production;
  environmentName = environment.production ? 'Production' : 'Development';
}
