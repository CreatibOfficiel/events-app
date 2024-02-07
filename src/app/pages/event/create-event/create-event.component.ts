import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../../core/event.service';
import { CommonModule } from '@angular/common';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../core/company.service';
import { Tag } from '../../../models/tag.model';
import { TagService } from '../../../core/tag.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm: FormGroup;
  organizers: Company[] = [];
  tags: Tag[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private companyService: CompanyService,
    private tagService: TagService
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['YES', Validators.required],
      // file: new FormControl<File | undefined>(undefined, Validators.required),
      description: ['YES', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      location: ['YES', Validators.required],
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

    console.log(this.eventForm.get('file')?.value);

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

  // onFileChange(event: any) {
  //   const files = event.target.files;

  //   if (files.length > 0) {
  //     const file = files[0];
  //     this.eventForm.patchValue({
  //       file: file
  //     });
  //   }
  // }

}
