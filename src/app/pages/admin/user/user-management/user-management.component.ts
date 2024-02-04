import { Component } from '@angular/core';
import { UserService } from '../../../../core/user.service';
import { User } from '../../../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((res) => {
      this.getUsers();
    });
  }

}
