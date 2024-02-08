import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../../models/event.model';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {EventService} from "../../../core/event.service";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() event: Event = new Event(0, 'default name', 'default desc', new Date(), new Date(), new Date(), '', '', [], [], []);

  isMobile: boolean = false;

  constructor(private responsive: BreakpointObserver,
              private eventService: EventService) { }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  followEvent(eventId: number) {
    this.eventService.addParticipant(eventId).subscribe((res) => {
      alert('You are now following this event');
    });
  }

  protected readonly faPlus = faPlus;
  protected readonly faHeart = faHeart;
}
