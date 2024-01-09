import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
    providedIn: 'root',
  
  })

export class EventService {
  private apiUrl = 'https://localhost:8000';

  constructor(private http: HttpClient) { }

  getEventById(id: number) {
    this.http.get(this.apiUrl + '/api/events/' + id).subscribe((data) => {
        return data as Event;
    });

  }
}