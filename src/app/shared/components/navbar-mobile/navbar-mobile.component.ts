import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css'
})
export class NavbarMobileComponent {
  faHouse = faHouse;
  faMagnifyingGlass = faMagnifyingGlass;
  faCalendarDays = faCalendarDays;
  faUser = faUser;

  constructor(private router: Router) { }
}
