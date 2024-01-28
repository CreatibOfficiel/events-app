import { Injectable } from "@angular/core";
import { MainService } from "./main.service";
import { HttpClient } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";


@Injectable({
    providedIn: 'root',
    
})

export class TagService extends MainService {
    
    constructor(private http: HttpClient) { 
        super(http);
    }
    
    getAllTags() {
        return this.http.get(`${this.fullApiUrl}/tags`, { headers : this.headers }).pipe(
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

    deleteTag(id: number) {
        return this.http.delete(`${this.fullApiUrl}/tags/${id}`, { headers : this.headers }).pipe(
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

    createTag(tag: any) {
        return this.http.post(`${this.fullApiUrl}/tags`, tag, { headers : this.headersPost }).pipe(
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

    editTag(id: number, tag: any) {
        return this.http.put(`${this.fullApiUrl}/tags/${id}`, tag, { headers : this.headersPost }).pipe(
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