import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';

export class CompanyService extends MainService{

  constructor(private http: HttpClient) { 
    super(http);
  }

}