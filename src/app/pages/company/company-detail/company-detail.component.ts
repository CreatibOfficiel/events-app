import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../core/company.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {
  faArrowLeft = faArrowLeft;
  selectedCompany: Company|null = null;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = params['id'];

      this.getSelectedCompany(companyId).then((company) => {
        console.log(company);
        this.selectedCompany = company;
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
