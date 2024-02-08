import {ChangeDetectorRef, Component} from '@angular/core';
import {UserService} from "../../core/user.service";
import {User} from "../../models/user.model";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from "../../core/authentication.service";

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
    isCompany: boolean = false;

    constructor(
      private userService: UserService,
      private authService: AuthenticationService,
      private router: Router,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.getUserRoles();
      this.getUserData();
      this.isCompany = this.userService.isCompany();
      this.cdr.detectChanges();
    }

    async getUserData() {
      this.userData = await this.userService.getCurrentUser();
      this.cdr.detectChanges();
    }

    getUserRoles(): void {
      this.userService.getCurrentUserRoles().subscribe((res: any) => {
        this.userRole = res;
        this.isAdmin = this.userRole.includes("ROLE_ADMIN");
      });
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }


  getFullName(): string {
    return `${this.userData.firstname} ${this.userData.lastname}`;
  }
}
