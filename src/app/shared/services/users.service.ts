// import native modules
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  public AddNewUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/users/', user);
  }

  public editUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:3000/api/users/', user);
  }
}
