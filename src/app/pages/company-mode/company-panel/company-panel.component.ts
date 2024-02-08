import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-panel',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './company-panel.component.html',
  styleUrl: './company-panel.component.css'
})
export class CompanyPanelComponent {
  faArrowLeft = faArrowLeft;

  constructor(
    private _location: Location
  ) {}

  backClicked() {
    this._location.back();
  }

}
