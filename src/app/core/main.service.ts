import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public apiUrl = 'https://localhost:8000';
  public fullApiUrl = `${this.apiUrl}/api`;
  public token = this.getToken();
  public headers = this.getHeaders();
  constructor(
    http: HttpClient
  ) {
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  }

}
