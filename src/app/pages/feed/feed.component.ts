import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { Company } from '../../models/company.model';
import { Event } from '../../models/event.model';
import { EventService } from '../../core/event.service';
import { UserService } from '../../core/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CardComponent, MatProgressSpinnerModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

  events: Event[] = [];
  pageToLoad = 1;
  loading = false;
  spinnerColor: ThemePalette = 'warn';
  userId: any;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    ) { }

    ngOnInit(): void {

      this.getUserId();
      //ToDo: Get events by user interests or by following companies
      this.getLatestEvents().then((events) => {
        console.log(events);
        this.events = events;
        for (let event of this.events) {
          event.realOrganizers = [];
        }
      });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {

      //console.log(event.target.scrollingElement.scrollHeight - event.target.scrollingElement.scrollTop);
      //console.log(event.target.scrollingElement.clientHeight);
      if ((event.target.scrollingElement.scrollHeight - event.target.scrollingElement.scrollTop) <= event.target.scrollingElement.clientHeight + 100) {
        this.loading = true;
        console.log(this.loading);
      } else {
        this.loading = false;
        console.log(this.loading);
      }
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

  async getUserId() {
    this.userId = await this.userService.getCurrentUserId();
  }
}
