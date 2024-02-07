import { Component } from '@angular/core';
import {UserService} from "../../core/user.service";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    userData: User = new User();
    userRole: string[] = [];
    isAdmin: boolean = false;

    constructor(
      private userService: UserService
    ) {}

    ngOnInit(): void {
      this.userData = this.userService.getUser();
      this.getUserRoles();
    }

    getUserRoles(): void {
      this.userService.getCurrentUserRoles().subscribe((res: any) => {
        this.userRole = res;
        this.isAdmin = this.userRole.includes("ROLE_ADMIN");
      });
    }
}
