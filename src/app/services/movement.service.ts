import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private baseURL= 'http://localhost:16065/api/movements';

  constructor(private http: HttpClient) { }

  getMovements(): Observable<any>{
    return this.http.get(`${this.baseURL}`);
  }

  getMovement(id: number): Observable<any>{
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createMovement(movement: Object): Observable<Object>{
    return this.http.post(`${this.baseURL}`, movement);
  }

  updateMovement(id: number, value: any): Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`, value);
  }

  deleteMovement(id: number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
