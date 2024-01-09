import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { Company } from '../../models/company.model';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  company: Company = new Company(1, 'test', 'test', [], 'test', new Date(), 'test', true);
  company2: Company = new Company(2, 'test2', 'test2', [], 'test2', new Date(), 'test2', true);

  event: Event = new Event(1, 'coucou', 'test', new Date(), new Date(), new Date(), 'Grenoble', '', [], [this.company, this.company2], []);
  event2: Event = new Event(1, 'coucou2', 'test2', new Date(), new Date(), new Date(), 'Grenoble', '', [], [this.company, this.company2], []);
  events: Event[] = [];

  constructor() { 
    this.events.push(this.event);
    this.events.push(this.event2);
    console.log(this.events);
  }

}
