import { Injectable } from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MainService} from "./main.service";
import { User } from '../models/user.model';

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

  getAllUsers() {
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

  deleteUser(userId: number) {
    return this.http.delete(`${this.fullApiUrl}/users/${userId}`, { headers : this.headers }).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  updateUser(userId: number, user: any) {
    return this.http.put(`${this.fullApiUrl}/users/${userId}`, user, { headers : this.headers }).pipe(
      tap((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  getUserById(userId: number): Promise<User|null> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/users/${userId}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as User);
      });
    });
  }
}
