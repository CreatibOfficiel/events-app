import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  faArrowLeft = faArrowLeft;

  constructor(
    private _location: Location
  ) {}

  backClicked() {
    this._location.back();
  }

}
