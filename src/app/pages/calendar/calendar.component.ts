import { Component } from '@angular/core';
import { Event } from '../../models/event.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { EventService } from '../../core/event.service';
import { UserService } from '../../core/user.service';
import { User } from '../../models/user.model';
import { CompanyService } from '../../core/company.service';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  imports: [CardComponent, CommonModule, FontAwesomeModule, MatProgressSpinnerModule]
})
export class CalendarComponent {

  events: Event[] = [];

  currentDay: Date = new Date();
  month: number = this.currentDay.getMonth() + 1;
  monthString = this.currentDay.toLocaleString('fr-FR', { month: 'long' });
  year = this.currentDay.getFullYear();
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  userId: number|undefined = undefined;
  spinnerColor: ThemePalette = 'warn';
  isLoading = false;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private companyService: CompanyService
    ) {}

    ngOnInit(): void {

      // this.userService.getCurrentUser().subscribe((res: any) => {
      //   this.userId = res.id;
      //   this.getUserEventsForMonth(this.userId!, this.month).then((events) => {
      //     console.log(events);
      //     this.events = events;
      //   });
      // });
      this.userService.getCurrentUser().then((user: User) => {
        this.userId = user.id;
        this.isLoading = true;
        this.getUserEventsForMonth(this.userId!, this.month).then((events) => {
          this.isLoading = false;
          this.events = events;
          for (let event of this.events) {
            event.realOrganizers = [];
          }
        });
      });
      

      // this.getUserId().then((id) => {
      //   console.log(id);
      //   this.userId = id;
      //   this.getUserEventsForMonth(id, this.month).then((events) => {
      //     console.log(events);
      //     this.events = events;
      //   });
      // });


    }

    async getUserEventsForMonth(userId: number, month: number): Promise<Event[]> {
      let events = await this.eventService.getUserEventsForMonth(userId, month);

      if (events !== null) {
        return events;
      }

      return [];
    }

    nextMonth() {
      this.currentDay.setMonth(this.currentDay.getMonth() + 1);
      this.month = this.currentDay.getMonth() + 1;
      this.monthString = this.currentDay.toLocaleString('fr-FR', { month: 'long' });
      this.year = this.currentDay.getFullYear();

      this.isLoading = true;
      this.getUserEventsForMonth(this.userId!, this.month).then((events) => {
        console.log(events);
        this.isLoading = false;
        this.events = events;
        for (let event of this.events) {
          event.realOrganizers = [];
        }
      });
    }

    previousMonth() {
      this.currentDay.setMonth(this.currentDay.getMonth() - 1);
      this.month = this.currentDay.getMonth() + 1;
      this.monthString = this.currentDay.toLocaleString('fr-FR', { month: 'long' });
      this.year = this.currentDay.getFullYear();

      this.isLoading = true;
      this.getUserEventsForMonth(this.userId!, this.month).then((events) => {
        console.log(events);
        this.isLoading = false;
        this.events = events;
        for (let event of this.events) {
          event.realOrganizers = [];
        }
      });
    }

    isAuthenticated(): boolean {
      return this.userService.isAuthenticated();
    }

    async getUserId(): Promise<number> {
      const currentUser: User = await this.userService.getUserChelou();
      console.log(currentUser);
      return currentUser.getId();
    }

  }
