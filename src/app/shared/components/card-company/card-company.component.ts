import {Component, Input} from '@angular/core';
import {DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {Company} from "../../../models/company.model";
import {CompanyCategory} from "../../../models/company-category.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {faBuilding, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-card-company',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    SlicePipe,
    FaIconComponent
  ],
  templateUrl: './card-company.component.html',
  styleUrl: './card-company.component.css'
})
export class CardCompanyComponent {
  @Input() company: Company = new Company(0, 'default name', 'default type', [new CompanyCategory(0, 'default name', 'default desc')], 'default desc', new Date(), 'default location', false, []);
  isMobile: boolean = false;
  faBuildingMemo: IconProp = faBuilding;

  protected readonly faCalendarDays = faCalendarDays;

  constructor(private responsive: BreakpointObserver) { }
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

  getCompanyCategoriesAsString(): string {
    console.log(this.company);
    let categoriesAsString = '';
    this.company.categories.forEach((category: CompanyCategory) => {
      categoriesAsString += category.name;
      if (category !== this.company.categories[this.company.categories.length - 1]) {
        categoriesAsString += ' | ';
      }

    });
    return categoriesAsString;
  }
}
