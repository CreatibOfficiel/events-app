import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../core/event.service';
import { CommonModule, Location } from '@angular/common';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../core/company.service';
import { Tag } from '../../../models/tag.model';
import { TagService } from '../../../core/tag.service';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, FontAwesomeModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm: FormGroup;
  organizers: Company[] = [];
  tags: Tag[] = [];
  faArrowLeft = faArrowLeft;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private companyService: CompanyService,
    private tagService: TagService,
    private _location: Location
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      location: ['', Validators.required],
      organizerIds: [[], Validators.required],
      tagIds: [[], Validators.required],
      participantIds: [[]]
    });
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getTags();
  }

  createEvent() {
    if (this.eventForm.invalid) {
      return;
    }

    this.eventService.createEvent(this.eventForm.value).subscribe((res) => {
      console.log(res);
    });
  }

  getCompanies() {
    this.companyService.getAllCompanies().subscribe((companies: Company[]) => {
      this.organizers = companies;
    });
  }

  getTags() {
    this.tagService.getAllTags().subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  backClicked() {
    this._location.back();
  }

}
