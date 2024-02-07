import { Component } from '@angular/core';
import { Event } from '../../../../models/event.model';
import { EventService } from '../../../../core/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent {
  events: Event[] = [];

  constructor(
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe((res) => {
      this.getEvents();
    });
  }



}
