import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  selectedEvent: Event|null = null;
  
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter from the route
      const eventId = params['id'];

      this.getSelectedEvent(eventId).then((event) => {
        this.selectedEvent = event;
        console.log(this.selectedEvent);
      });

    });
  }

  async getSelectedEvent(id: number): Promise<Event|null> {
    
    let event = await this.eventService.getEventById(id);

    if (event !== null) {
      return event;
    }

    return null;
  }

}
