import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../core/event.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from '../../core/company.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  selectedEvent: Event|null = null;
  faArrowLeft = faArrowLeft;
  
  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService,
    private companyService: CompanyService,
    private _location: Location
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter from the route
      const eventId = params['id'];

      this.getSelectedEvent(eventId).then((event) => {
        this.selectedEvent = event;
        this.selectedEvent!.realOrganizers = [];
        console.log(this.selectedEvent);
      });

    });
  }

  async getSelectedEvent(id: number): Promise<Event|null> {
    
    let event = await this.eventService.getEventById(id);
    
    if (event !== null) {
      event.organizers.forEach((organizer) => {
        const match = organizer.match(/\/(\d+)$/);
        if (match) {
          let organizerId = parseInt(match[1], 10);
          this.companyService.getCompanyById(organizerId).then((company) => {
            if (company) {
              event!.realOrganizers.push(company);
            }
          });
        }
        
      });
    }
    
    if (event !== null) {
      return event;
    }

    return null;
  }

  backClicked() {
    this._location.back();
  }

}
