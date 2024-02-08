import { Injectable } from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MainService} from "./main.service";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService{
  user: User = new User();

  constructor(private http: HttpClient) {
    super(http);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserChelou(): any {
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

  // getCurrentUser(token?:string): any {
  //   return this.http.get(`${this.fullApiUrl}/users/getUser`, {
  //     headers : token ? new HttpHeaders()
  //       .set('Authorization', `Bearer ${token}`)
  //       .set('Content-Type', 'application/json')
  //       .set('Accept', 'application/json')
  //       : this.headers
  //   }).pipe(
  //     tap((res: any) => {
  //       return res;
  //     }),
  //     catchError(err => {
  //       console.log(err);
  //       return of(false);
  //     })
  //   );
  // }

  async getCurrentUser(token?:string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/users/getUser`, {
        headers : token ? new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          : this.headers
      }).subscribe((data) => {
        resolve(data as User);
      });
    });
  }

  // async search(searchValue: string): Promise<Event[]> {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(`${this.fullApiUrl}/events/search`, {search : searchValue } ,{ headers : this.headers }).subscribe((data) => {
  //       resolve(data as Event[]);
  //     });
  //   });
  // }

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
    return this.http.patch(`${this.fullApiUrl}/users/${userId}`, user, { headers : this.patchHeaders() }).pipe(
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

  setCurrentUser(res: any) {
    console.log('Setting current user with response:', res);
    if (res && res.id) { // Assuming `res` has the user details
      this.user = new User(res.id, res.firstname, res.lastname, res.email, res.password, res.company);
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('Current user set:', this.user);
    } else {
      console.error('Failed to set current user due to invalid response:', res);
    }
  }

  getCurrentUserRoles() {
    return this.http.get(`${this.fullApiUrl}/users/getRoles`, { headers : this.headers }).pipe(
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

  async IsRoleAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getCurrentUserRoles().subscribe((res: any) => {
        resolve(res.includes("ROLE_ADMIN"));
      });
    });
  }

  setCompany(userId: number, companyId: number) {
    console.log('Setting company for user:', userId, 'with company:', companyId);
    return this.http.post(`${this.fullApiUrl}/users/${userId}/addCompany`, {"companyId" : companyId}, { headers : this.headersPost }).pipe(
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

  async isCurrentUserCompany(): Promise<boolean> {
    return await this.getCurrentUser().then((user: User) => {
      return user.company !== undefined && user.company !== null;
    });
  }
}
