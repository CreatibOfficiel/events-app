import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication.service';

@Component({
  selector: 'app-logout-popup',
  standalone: true,
  imports: [],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent {

  constructor(
    private AuthService: AuthenticationService
  ) { }
  logout() {
    this.AuthService.logout();
    console.log('logout');
  }
}
