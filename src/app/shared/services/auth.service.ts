import {User} from '../models/user.model';

export class AuthService {
  private isAuthenticated = false;

  public logout(): void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  public login(): void {
    this.isAuthenticated = true;
  }

  public getUser(): User {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  public isLoggedIn(): Promise<boolean> {
      return new Promise((res, rej) => {
          const islogged = window.localStorage.getItem('user') ? true : false;
          res(islogged);
      });
  }
}
