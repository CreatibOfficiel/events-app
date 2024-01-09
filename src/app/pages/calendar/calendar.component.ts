import { Component } from '@angular/core';
import { Event } from '../../models/event.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
    imports: [CardComponent, CommonModule, FontAwesomeModule]
})
export class CalendarComponent {
  company: Company = new Company(1, 'test', 'test', [], 'test', new Date(), 'test', true);
  company2: Company = new Company(2, 'test2', 'test2', [], 'test2', new Date(), 'test2', true);

  event: Event = new Event(1, 'coucou', 'test', new Date(), new Date(), new Date(), 'Grenoble', '', [], [this.company, this.company2], []);
  event2: Event = new Event(1, 'coucou2', 'test2', new Date(), new Date(), new Date(), 'Grenoble', '', [], [this.company, this.company2], []);
  events: Event[] = [];

  currentDay: Date = new Date();
  month = this.currentDay.toLocaleString('default', { month: 'long' });
  year = this.currentDay.getFullYear();
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor() {
    this.events.push(this.event);
    this.events.push(this.event2);
    console.log(this.events);
  }

  nextMonth() {
    this.currentDay.setMonth(this.currentDay.getMonth() + 1);
    this.month = this.currentDay.toLocaleString('default', { month: 'long' });
    this.year = this.currentDay.getFullYear();
  }

  previousMonth() {
    this.currentDay.setMonth(this.currentDay.getMonth() - 1);
    this.month = this.currentDay.toLocaleString('default', { month: 'long' });
    this.year = this.currentDay.getFullYear();
  }

}