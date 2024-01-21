import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { Company } from '../models/company.model';
import { CompanyCategory } from '../models/company-category.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})

export class CompanyService extends MainService{
  
  constructor(private http: HttpClient) { 
    super(http);
  }
  
  async getCompanyById(id: number): Promise<Company|null> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.fullApiUrl}/companies/${id}`, { headers : this.headers }).subscribe((data) => {
        resolve(data as Company);
      });
    });
  }
  
  async postCompany(company: Company): Promise<Company|null> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.fullApiUrl}/companies`, company, { headers : this.headersPost }).subscribe(
        (data) => {
          resolve(data as Company);
        },
        (error) => {
          reject(error);
        }
        );
      });
    }
    
    getCompanyCategories(): any {
      return this.http.get(`${this.fullApiUrl}/company_categories`, { headers : this.headers }).pipe(
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