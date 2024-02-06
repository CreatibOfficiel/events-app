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
  public headersPost = this.postHeaders();
  public headersPostNoToken = this.postHeadersNoToken();

  constructor(
    http: HttpClient
  ) {
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Accept', 'application/json');
  }

  public postHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  public postHeadersNoToken(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }



}
