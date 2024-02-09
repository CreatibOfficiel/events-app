import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarMobileComponent } from './shared/components/navbar-mobile/navbar-mobile.component';
import { NavbarDesktopComponent } from './shared/components/navbar-desktop/navbar-desktop.component';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarMobileComponent, NavbarDesktopComponent, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isMobile: boolean = false;
  //title = 'Front';

  constructor(private responsive: BreakpointObserver,
    private router: Router) { }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  isLoginOrRegisterPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register' || this.router.url.includes('/company');
  }

}
