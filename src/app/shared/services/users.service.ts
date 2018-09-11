import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { IResult } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserByEmail(email: string): Observable<IResult> {
    return this.http.get<IResult>(`http://localhost:3000/api/users/check/?email=${email}`);
  }

  public AddNewUser(user: User): Observable<IResult> {
    return this.http.post<IResult>('http://localhost:3000/api/users/', user);
  }

  public getUser(): Observable<IResult> {
    return this.http.get<IResult>(`http://localhost:3000/api/users/`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public editUser(user: User): Observable<IResult> {
    return this.http.put<IResult>('http://localhost:3000/api/users/', user, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public loginUser(user: User): Observable<IResult> {
    return this.http.post<IResult>('http://localhost:3000/api/users/login', user);
  }
}
