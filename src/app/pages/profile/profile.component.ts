import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from "../../core/user.service";
import { User } from "../../models/user.model";
import { NgIf } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationService } from "../../core/authentication.service";
import { faCalendar, faChevronRight, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  faChevronRight = faChevronRight;
  faCalendar = faCalendar;
  faPeopleGroup = faPeopleGroup;

  userData: User = new User();
  userRole: string[] = [];
  isAdmin: boolean = false;
  isCompany: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  async getUserData() {
    this.userData = await this.userService.getCurrentUser();
    this.isCompany = await this.userService.isCurrentUserCompany();
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    this.getUserRoles();
    this.getUserData();
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

  getMemberSince(): string {
    return "02/02/2020";
  }
}
