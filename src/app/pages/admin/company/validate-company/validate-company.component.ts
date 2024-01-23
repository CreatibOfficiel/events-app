import { Component } from '@angular/core';
import { CompanyService } from '../../../../core/company.service';
import { Company } from '../../../../models/company.model';

@Component({
  selector: 'app-validate-company',
  standalone: true,
  imports: [],
  templateUrl: './validate-company.component.html',
  styleUrl: './validate-company.component.css'
})
export class ValidateCompanyComponent {

  companiesToValidate: Company[] = [];

  constructor(
    private companyService: CompanyService
  ) { }

  // ngOnInit(): void {
  //   this.getCompaniesToValidate().then((companies) => {
  //     this.companiesToValidate = companies;
  //   });
  // }

  // async getCompaniesToValidate(): Promise<Company[]> {
  //   let companies = await this.companyService.getCompaniesToValidate()

  //   if (companies !== null) {
  //     return companies;
  //   }

  //   return [];
  // }

  validateCompany(companyId: number) {

  }

  rejectCompany(companyId: number) {

  }

}
