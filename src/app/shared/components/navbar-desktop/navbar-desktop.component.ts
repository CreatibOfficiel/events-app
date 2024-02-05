import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthenticationService} from "../../../core/authentication.service";
import {UserService} from "../../../core/user.service";
import {NgIf} from "@angular/common";
import { LogoutPopupComponent } from '../logout-popup/logout-popup.component';

@Component({
  selector: 'app-navbar-desktop',
  standalone: true,
  imports: [RouterLink, NgIf, LogoutPopupComponent],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.css'
})
export class NavbarDesktopComponent {

  constructor(
    private AuthService: AuthenticationService,
    private UserService: UserService
  ) {
  }

  ngOnInit(): void {
    this.UserService.getUserChelou().subscribe((res: any) => {
      console.log(res);
    });
  }

  isAuthenticated(): boolean {
    return this.UserService.isAuthenticated();
  }

}
