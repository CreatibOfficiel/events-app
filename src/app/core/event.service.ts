import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root',
  
  })

export class EventService extends MainService {

  constructor(private http: HttpClient) { 
    super(http);
  }

  getEventById(id: number): Event|null {
    this.http.get(`${this.fullApiUrl}/events/${id}`, { headers : this.headers }).subscribe((data) => {
        return data as Event;
    });

    return null;
  }
}