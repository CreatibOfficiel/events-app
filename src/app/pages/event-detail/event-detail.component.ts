import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter from the route
      const eventId = params['id'];

      let event = this.eventService.getEventById(eventId);

      console.log(event);

    });
  }

}
