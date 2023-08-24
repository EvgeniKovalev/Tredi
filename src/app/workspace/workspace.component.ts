import { Component } from '@angular/core';
import { AuthenticationService } from '../data-access/authentication.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent {
  constructor(private authService: AuthenticationService) {
    this.authService.CheckUserAccess();
  }
}
