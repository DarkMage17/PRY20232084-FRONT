import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUser } from '../models/CreateUser';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private baseUrl = 'http://localhost:16065/api/Users';
  
    constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') ?? '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
  }

    public get currentUserValue(): any {
      return this.currentUserSubject.value;
    }
  
    register(user: RegisterUser): Observable<any> {
        user.registerDate = new Date();
        user.userType = true;
      return this.http.post(`${this.baseUrl}/register`, user);
    }

    login(email: string, password: string) {
      return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
        .pipe(map(user => {
          if (user && user.token) {
            // El usuario es válido, lo guardamos en el almacenamiento local y lo emitimos a través del BehaviorSubject
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          } else {
            // El usuario no es válido, limpiamos el almacenamiento local y emitimos null
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
          }
          return user;
        }));
    }
  
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }