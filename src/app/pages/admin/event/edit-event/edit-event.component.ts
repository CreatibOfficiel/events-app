import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event } from '../../../../models/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../core/event.service';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  editEventForm: FormGroup;
  selectedEvent: Event | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) { 
    this.editEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      const eventId = params['id'];

      this.getSelectedEvent(eventId).then(
        (data) => {
          this.selectedEvent = data!;
          this.setDefaultValues();
        }
      );
    });
  }

  async getSelectedEvent(eventId: number) {
    let event = await this.eventService.getEventById(eventId);

    if (event !== null) {
      return event;
    }

    return null;

  }

  setDefaultValues() {
    this.editEventForm.get('name')?.setValue(this.selectedEvent?.name);
    this.editEventForm.get('image')?.setValue(this.selectedEvent?.image);
    this.editEventForm.get('description')?.setValue(this.selectedEvent?.description);
    this.editEventForm.get('startDateTime')?.setValue(this.selectedEvent?.startDateTime);
    this.editEventForm.get('endDateTime')?.setValue(this.selectedEvent?.endDateTime);
    this.editEventForm.get('location')?.setValue(this.selectedEvent?.location);
  }

  updateEvent() {
    if (this.editEventForm.valid) {
      this.eventService.updateEvent(this.selectedEvent!.id, this.editEventForm.value).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
