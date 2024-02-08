import { Component, Input } from '@angular/core';
import { Event } from '../../../models/event.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './mini-card.component.html',
  styleUrl: './mini-card.component.css'
})
export class MiniCardComponent {
  @Input() event: Event = new Event(0, 'default name', 'default desc', new Date(), new Date(), new Date(), '', '', [], [], []);
  @Input() showOrganizer: boolean = false;

  constructor() { }

}
