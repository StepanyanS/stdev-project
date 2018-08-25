import {User} from '../models/user.model';

export class AuthService {
  private isAuthenticated = false;

  public logout(): void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  public login(token: string): void {
    window.localStorage.setItem('token', token);
    this.isAuthenticated = true;
  }

  public getUser(): User {
    return JSON.parse(window.localStorage.getItem('token'));
  }

  public isLoggedIn(): Promise<boolean> {
      return new Promise((res, rej) => {
          const islogged = window.localStorage.getItem('token') ? true : false;
          res(islogged);
      });
  }
}
