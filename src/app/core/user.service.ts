import { Injectable } from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MainService} from "./main.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService{


  constructor(private http: HttpClient) {
    super(http);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUser(): any {
    return this.http.get(`${this.fullApiUrl}/users`, { headers : this.headers }).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  getUserIdByEmail(email: string): any {
    return this.http.get(`${this.fullApiUrl}/users/getByEmail`, { headers : this.headers }).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  getCurrentUser(): any {
    return this.http.get(`${this.fullApiUrl}/users/getUser`, { headers : this.headers }).pipe(
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
