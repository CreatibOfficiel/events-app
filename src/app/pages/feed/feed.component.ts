import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { Company } from '../../models/company.model';
import { Event } from '../../models/event.model';
import { EventService } from '../../core/event.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  
  events: Event[] = [];
  pageToLoad = 1;

  constructor(
    private eventService: EventService,
    private userService: UserService) { }

  ngOnInit(): void {

    //ToDo: Get events by user interests or by following companies
    this.getLatestEvents().then((events) => {
      console.log(events);
      this.events = events;
    });
  }

  async getLatestEvents(): Promise<Event[]> {
    let events = await this.eventService.getLatestEvents();

    if (events !== null) {
      return events;
    }

    return [];
  }

  async getEventsByUserInterests(userId: number, page: number): Promise<Event[]> {
    let events = await this.eventService.getEventsByUserInterests(userId, page);

    if (events !== null) {
      return events;
    }

    return [];
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

}
