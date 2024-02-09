import { Component } from '@angular/core';
import { Event } from '../../../../models/event.model';
import { EventService } from '../../../../core/event.service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import { CompanyService } from '../../../../core/company.service';

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
    private companyService: CompanyService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
      for (let event of this.events) {
        event.realOrganizers = [];
        event.organizers.forEach((organizer) => {
          const match = organizer.match(/\/(\d+)$/);
          if (match) {
            let organizerId = parseInt(match[1], 10);
            this.companyService.getCompanyById(organizerId).then((company) => {
              if (company) {
                event.realOrganizers.push(company);
              }
            });
          }
        });
      }
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
