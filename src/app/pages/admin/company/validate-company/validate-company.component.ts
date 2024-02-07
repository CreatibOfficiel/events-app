import { Component } from '@angular/core';
import { CompanyService } from '../../../../core/company.service';
import { Company } from '../../../../models/company.model';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-validate-company',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './validate-company.component.html',
  styleUrl: './validate-company.component.css'
})
export class ValidateCompanyComponent {
  
  companiesToValidate: Company[] = [];
  faArrowLeft = faArrowLeft;
  
  constructor(
    private companyService: CompanyService,
    private _location: Location
    ) { }
    
    ngOnInit(): void {
      this.getCompaniesToValidate().then((companies) => {
        this.companiesToValidate = companies;
      });
    }
    
    async getCompaniesToValidate(): Promise<Company[]> {
      let companies = await this.companyService.getCompaniesToValidate()
      
      if (companies !== null) {
        return companies;
      }
      
      return [];
    }
    
    async validateCompany(companyId: number) {
      console.log("validate company");
      await this.companyService.validateCompany(companyId);
      this.getCompaniesToValidate().then((companies) => {
        this.companiesToValidate = companies;
      })
      
    }
    
    async rejectCompany(companyId: number) {
      console.log("reject company");
      await this.companyService.deleteCompany(companyId);
      this.getCompaniesToValidate().then((companies) => {
        this.companiesToValidate = companies;
      });
    }

    backClicked() {
      this._location.back();
    }
    
  }
  