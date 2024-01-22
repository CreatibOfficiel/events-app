import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-popup',
  standalone: true,
  imports: [],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent {

  constructor(
    private AuthService: AuthenticationService,
    private router: Router
  ) { }
  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }
}
