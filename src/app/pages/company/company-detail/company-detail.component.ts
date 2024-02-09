import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../core/company.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faCalendar, faCheck, faPeopleGroup, faTriangleExclamation, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../../models/company.model';
import { MiniCardComponent } from '../../../shared/components/mini-card/mini-card.component';
import { Event } from '../../../models/event.model';
import { EventService } from '../../../core/event.service';
import {UserService} from "../../../core/user.service";
import {faUserMinus} from "@fortawesome/free-solid-svg-icons/faUserMinus";

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MiniCardComponent],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {
  faAngleLeft = faAngleLeft;
  faCheck = faCheck;
  faTriangleExclamation = faTriangleExclamation;
  faCalendar = faCalendar;
  faPeopleGroup = faPeopleGroup;
  faUserPlus = faUserPlus;
  selectedCompany: Company | null = null;
  organizedEventsIds: any[] = [];
  organizedEvents: Event[] = [];
  userId: any;
  suscribersNumber: number = 0;
  isSubscribed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private companyService: CompanyService,
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = params['id'];

      this.getSelectedCompany(companyId).then((company) => {
        console.log(company);
        this.selectedCompany = company;
        this.suscribersNumber = company?.suscribersNumber || 0;
        this.organizedEventsIds = company?.events || [];
        for (let event of this.organizedEventsIds) {
          this.eventService.getEventById(event.id).then((event: Event | null) => {
            if (event !== null) {
              this.organizedEvents.push(event);
            }
          });
        }
        this.companyService.isUserSubscriber(this.selectedCompany ? this.selectedCompany.id : 0).subscribe((data) => {
          console.log(data);
          if (data !== null && data === true) {
            this.isSubscribed = true;
          }
        });
      });

    });
  }

  backClicked() {
    this._location.back();
  }

  async getSelectedCompany(id: number): Promise<Company | null> {
    let company = await this.companyService.getCompanyById(id);

    if (company !== null) {
      return company;
    }

    return null;
  }

  getCompanySince(): string {
    if (this.selectedCompany !== null) {
      return '14/02/2021';
    }
    return '14/02/2021';
  }

  async getUserId() {
    this.userId = await this.userService.getCurrentUserId();
  }

  subscribeToCompany() {
    if (!this.isSubscribed) {
      this.companyService.addFollow(this.selectedCompany ? this.selectedCompany.id : 0).subscribe((data) => {
        console.log(data);
        if (data !== null) {
          this.suscribersNumber++;
          this.isSubscribed = true;
        }
      });
    } else {
      this.companyService.removeFollow(this.selectedCompany ? this.selectedCompany.id : 0).subscribe((data) => {
        console.log(data);
        if (data !== null) {
          this.suscribersNumber--;
          this.isSubscribed = false;
        }
      });
    }
  }

  protected readonly faUserMinus = faUserMinus;
}
