import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

const ACCES_TOKEN = 'access-token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(usersService: UsersService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(ACCES_TOKEN);
    window.sessionStorage.setItem(ACCES_TOKEN, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(ACCES_TOKEN);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
  }
}
