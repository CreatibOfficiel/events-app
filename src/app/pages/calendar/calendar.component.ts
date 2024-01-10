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

  event: Event = new Event(1, 'coucou', `Lorem ipsum dolor sit amet. In commodi voluptatum sed itaque quia sit voluptates quia. Et reprehenderit temporibus aut dolores magni et tempore accusamus et laboriosam natus.

  Et voluptatem iusto ut maxime sapiente et excepturi reiciendis est quibusdam voluptatum. Non Quis minus aut neque repellendus qui quidem dolorum aut consequatur enim in itaque laudantium 33 similique consequatur. Eum error veritatis ad doloremque deleniti sit illum quibusdam ut soluta minus ut placeat perferendis aut mollitia sint? Eum repudiandae provident qui tenetur Quis ut quia voluptas sed cupiditate itaque est magni voluptatem est distinctio impedit qui voluptatibus impedit.
  
  Ut voluptatibus officia quo repellat atque est dolorem iste aut aliquam fugit qui totam enim eum blanditiis dignissimos! Ut accusamus earum non aliquid fugiat et galisum voluptatem 33 iusto aspernatur. Ut cupiditate excepturi et culpa dolores in doloremque quas qui deleniti illo.`, new Date(), new Date(), new Date(), 'Grenoble', '', [], [this.company, this.company2], []);
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