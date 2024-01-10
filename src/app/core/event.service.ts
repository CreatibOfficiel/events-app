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

  // getEventById(id: number): Event|null {
  //   this.http.get(`${this.fullApiUrl}/events/${id}`, { headers : this.headers }).subscribe((data) => {
  //       return data as Event;
  //   });

  //   return null;
  // }

  async getEventById(id: number): Promise<Event|null> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/${id}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event);
      });
    });
  }


  getLatestEvents(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/latest`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  async getUserEventsForMonth(userId: number, month: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/user/${userId}/month/${month}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  async getEventsByUserInterests(userId: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/user/byUserAndInterests/${userId}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }
}