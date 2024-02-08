import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../core/company.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../../models/company.model';
import { MiniCardComponent } from '../../../shared/components/mini-card/mini-card.component';
import { Event } from '../../../models/event.model';
import { EventService } from '../../../core/event.service';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, MiniCardComponent],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {
  faArrowLeft = faArrowLeft;
  selectedCompany: Company|null = null;
  organizedEventsIds: any[] = [];
  organizedEvents: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private companyService: CompanyService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = params['id'];

      this.getSelectedCompany(companyId).then((company) => {
        console.log(company);
        this.selectedCompany = company;
        this.organizedEventsIds = company?.events || [];
        for (let event of this.organizedEventsIds) {
          this.eventService.getEventById(event.id).then((event: Event|null) => {
            if (event !== null) {
              this.organizedEvents.push(event);
            }
          });
        }
      });

    });
  }

  backClicked() {
    this._location.back();
  }

  async getSelectedCompany(id: number): Promise<Company|null> {
    let company = await this.companyService.getCompanyById(id);

    if (company !== null) {
      return company;
    }

    return null;
  }

}
