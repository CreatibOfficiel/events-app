import { Component } from '@angular/core';
import {UserService} from "../../core/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    userData: User = new User();

    constructor(
      private userService: UserService
    ) {}

    ngOnInit(): void {
      this.userData = this.userService.getUser();
    }
}
