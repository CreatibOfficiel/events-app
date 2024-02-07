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

      async editCompany(id: number, company: Company): Promise<Company|null> {
        return new Promise((resolve, reject) => {
          this.http.put(`${this.fullApiUrl}/companies/${id}`, company, { headers : this.headersPost }).subscribe(
            (data) => {
              resolve(data as Company);
            },
            (error) => {
              reject(error);
            }
            );
          });
        }

        // ToDo : Update when API route is created
        getCompaniesToValidate(): Promise<Company[]> {
          return new Promise((resolve, reject) => {
            this.http.get(`${this.fullApiUrl}/companies/waitingForApproval`, { headers : this.headers }).subscribe((data) => {
              resolve(data as Company[]);
            });
          });
        }

        getAllCompanies(): any {
          return this.http.get(`${this.fullApiUrl}/companies`, { headers : this.headers }).pipe(
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

        validateCompany(companyId: number): Promise<Company> {
          let body = {
            "validated": true
          };
          console.log(companyId);
          console.log(body);

          return new Promise((resolve, reject) => {
            this.http.patch(`${this.fullApiUrl}/companies/${companyId}`, body, { headers : this.headersPatch }).subscribe(
              (data) => {
                resolve(data as Company);
              },
              (error) => {
                reject(error);
              }
              );
            });
          }

        deleteCompany(companyId: number) {
          return this.http.delete(`${this.fullApiUrl}/companies/${companyId}`, { headers : this.headers }).pipe(
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
