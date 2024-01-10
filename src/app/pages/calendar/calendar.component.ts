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
@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
    imports: [CardComponent, CommonModule, FontAwesomeModule]
})
export class CalendarComponent {
  
  events: Event[] = [];

  currentDay: Date = new Date();
  month: number = this.currentDay.getMonth();
  monthString = this.currentDay.toLocaleString('default', { month: 'long' });
  year = this.currentDay.getFullYear();
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    if (this.isAuthenticated()) {
      this.getUserId().then((userId) => {
        this.getUserEventsForMonth(userId, this.month).then((events) => {
          console.log(events);
          this.events = events;
        });
      });
    }
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
    this.month = this.currentDay.getMonth();
    this.monthString = this.currentDay.toLocaleString('default', { month: 'long' });
    this.year = this.currentDay.getFullYear();

    this.getUserEventsForMonth(1, this.month).then((events) => {
      console.log(events);
      this.events = events;
    });
  }

  previousMonth() {
    this.currentDay.setMonth(this.currentDay.getMonth() - 1);
    this.month = this.currentDay.getMonth();
    this.monthString = this.currentDay.toLocaleString('default', { month: 'long' });
    this.year = this.currentDay.getFullYear();

    this.getUserEventsForMonth(1, this.month).then((events) => {
      console.log(events);
      this.events = events;
    });
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  async getUserId(): Promise<number> {
    const currentUser: User = await this.userService.getUser();
    console.log("Current user:");
    console.log(currentUser);
    return currentUser.id;
  }

}