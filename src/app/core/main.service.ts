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
  public headersPatch = this.patchHeaders();

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
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  public postHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  public patchHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/merge-patch+json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  public postHeadersNoToken(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }



}
