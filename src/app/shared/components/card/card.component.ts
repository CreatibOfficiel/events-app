import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../../models/event.model';
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {EventService} from "../../../core/event.service";
import { CompanyService } from '../../../core/company.service';
import {UserService} from "../../../core/user.service";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() event: Event = new Event(0, 'default name', 'default desc', new Date(), new Date(), new Date(), '', '', [], [], []);
  @Input() userId: number = 0;

  isMobile: boolean = false;
  isUserParticipating: boolean = false;

  constructor(
    private responsive: BreakpointObserver,
    private companyService: CompanyService,
    private eventService: EventService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
    ) { }

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

    if (this.event !== null) {
      this.event.organizers.forEach((organizer) => {
        const match = organizer.match(/\/(\d+)$/);
        if (match) {
          let organizerId = parseInt(match[1], 10);
          this.companyService.getCompanyById(organizerId).then((company) => {
            if (company) {
              this.event!.realOrganizers.push(company);
            }
          });
        }

      });
    }

    this.checkIsUserParticipating();
  }

  ngOnChanges() {
   this.checkIsUserParticipating();
  }

  checkIsUserParticipating() {

    if (this.event.userParticipating === undefined) {
      return;
    }
    this.isUserParticipating = this.event.userParticipating.includes(this.userId);
  }

  followEvent(eventId: number) {
    if (this.isUserParticipating) {
      this.eventService.removeParticipant(eventId).subscribe((res) => {
        if (res) {
          this.isUserParticipating = false;
        }
      });
      return;
    } else {
      this.eventService.addParticipant(eventId).subscribe((res) => {
        if (res) {
          this.isUserParticipating = true;
        }
      });
    }
  }

  protected readonly faPlus = faPlus;
  protected readonly faHeart = faHeart;
}
