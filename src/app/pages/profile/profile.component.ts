import { Component } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
    constructor(
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      if (!this.isAuthenticated()) {
        window.location.href = '/login';
      }
    }

    isAuthenticated(): boolean {
      return this.userService.isAuthenticated();
    }

}
