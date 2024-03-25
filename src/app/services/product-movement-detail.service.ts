import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductMovementDetailService {
    private baseURL= 'http://localhost:16065/api/ProductMovementDetails';
  
    constructor(private http: HttpClient) { }

    createProductMovementDetail(ProductMovementDetail: Object): Observable<Object>{
        return this.http.post(`${this.baseURL}`, ProductMovementDetail);
    }
  }  