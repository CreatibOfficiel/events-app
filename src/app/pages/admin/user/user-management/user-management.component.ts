import { Component } from '@angular/core';
import { UserService } from '../../../../core/user.service';
import { User } from '../../../../models/user.model';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [];
  faArrowLeft = faArrowLeft;

  constructor(
    private userService: UserService,
    private _location: Location
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

  backClicked() {
    this._location.back();
  }

}
