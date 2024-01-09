import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class AuthenticationService {
  private apiUrl = 'https://localhost:8000';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<boolean | { token: string }> {
    const credentials = { email, password };

    return this.http.post<{token: string}>(`${this.apiUrl}/auth`, credentials)
      .pipe(
        tap((res: { token: string; }) => {
          // Assuming the response contains a JWT token
          if (res && res.token) {
            // Store the token in local storage
            localStorage.setItem('token', res.token);
            return true;
          }
          return false; // Add this line to handle the case when the token is not present
        }),
        catchError(err => {
          console.log(err);
          return of(false);
        })
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users`, data).pipe(
      tap((res: any) => {
        if (res.code() === 201) {
          return res;
        }
      }),
      catchError(err => {
          if (err.status === 422) {
              return err.error.violations;
          } else {
              console.log(err);
          }
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by getting the token
    return !!localStorage.getItem('token');
  }
}
