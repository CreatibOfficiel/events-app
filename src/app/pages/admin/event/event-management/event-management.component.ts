import { Component } from '@angular/core';
import { Event } from '../../../../models/event.model';
import { EventService } from '../../../../core/event.service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent {
  events: Event[] = [];
  faArrowLeft = faArrowLeft;

  constructor(
    private eventService: EventService,
    private _location: Location
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

  backClicked() {
    this._location.back();
  }


  protected readonly faPlus = faPlus;
}
