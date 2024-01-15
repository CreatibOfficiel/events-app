import { Component } from '@angular/core';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
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
