import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { MainService } from './main.service';
import { catchError, of, tap } from 'rxjs';

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


  async getLatestEvents(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/latest`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  async getUserEventsForMonth(userId: number, month: number): Promise<Event[]> {
    console.log(`${this.fullApiUrl}/events/user/${userId}/month/${month}`);
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/user/${userId}/month/${month}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  async getEventsByUserInterests(userId: number, page: number): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/events/user/byUserAndInterests/${userId}?page=${page}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  getAllEvents() {
    return this.http.get(`${this.fullApiUrl}/events`, { headers : this.headers }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.fullApiUrl}/events/${id}`, { headers : this.headers }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  updateEvent(id: number, event: any) {
    return this.http.patch(`${this.fullApiUrl}/events/${id}`, event, { headers : this.headersPatch }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  async createEvent(event: any): Promise<Event|null> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.fullApiUrl}/events`, event, { headers : this.headersPost }).subscribe((data) => {
        resolve(data as Event);
      });
    });
  }

  async search(searchValue: string): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.fullApiUrl}/events/search`, {search : searchValue } ,{ headers : this.headers }).subscribe((data) => {
        resolve(data as Event[]);
      });
    });
  }

  getAllCompanyEvents(id: number) {
    return this.http.get(`${this.fullApiUrl}/events/getOfCompany/${id}`, { headers : this.headers }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  addParticipant(eventId: number) {
    return this.http.post(`${this.fullApiUrl}/events/addParticipant/${eventId}`, {"userId":5}, { headers : this.headersPost }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  getAllEventsOfCompany(companyId: number) {
    return this.http.get(`${this.fullApiUrl}/events/getOfCompany/${companyId}`, { headers : this.headers }).pipe(
      tap((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }
}
