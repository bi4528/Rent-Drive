import { Inject, Injectable } from '@angular/core';
import { Storage_Browser } from '../razredi/storage';
import { User } from '../razredi/user';
import { AuthenticationResult } from '../razredi/authentication-result';
import { UsersDataService } from '../storitve/users-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(Storage_Browser) private storage: Storage,
    private userDataService: UsersDataService
  ) { }

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  public is_logged(): boolean {
    const token: string = this.returnToken();
    if (token) {
      const koristnaVsebina = JSON.parse(this.b64Utf8(token.split('.')[1]));
      return koristnaVsebina.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public get_current_user(): User {
    if (this.is_logged()) {
      const token: string = this.returnToken();
      const { email, username } = JSON.parse(this.b64Utf8(token.split('.')[1]));
      return { email, username } as User;
    }
  }

  public async login(user: User): Promise<any> {
    return this.userDataService
      .login(user)
      .then((rezultatAvtentikacije: AuthenticationResult) => {
        this.saveToken(rezultatAvtentikacije["token"]);
      });
  }

  public async register(user: User): Promise<any> {
    return this.userDataService
      .register(user)
      .then((rezultatAvtentikacije: AuthenticationResult) => {
        this.saveToken(rezultatAvtentikacije["token"]);
      })
  }

  public logout(): void {
    this.storage.removeItem('rentdrive-token');
  }

  public returnToken(): string {
    return this.storage.getItem('rentdrive-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('rentdrive-token', token);
  }

}