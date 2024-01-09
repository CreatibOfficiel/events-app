import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CompanyService {
  private apiUrl = 'https://localhost:8000';

  constructor(private http: HttpClient) { }

}