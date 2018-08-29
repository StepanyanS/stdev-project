// import native modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface IToken {
  token: string;
}

// import models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/?email=${email}`);
  }

  public AddNewUser(user: User): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:3000/api/users/', user);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/`, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public editUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/api/users/', user, {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  public loginUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', user)
    .pipe(map((res: IToken) => res.token));
  }
}
