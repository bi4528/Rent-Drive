import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../razredi/user';
import { Vehicle } from '../razredi/vehicle';
import { Rent } from '../razredi/rent';
import { AuthenticationResult } from '../razredi/authentication-result';
import { Storage_Browser } from '../razredi/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  constructor(private http: HttpClient, @Inject(Storage_Browser) private shramba: Storage) { }

  private apiUrl = 'http://localhost:3000/api'; //environment.apiUrl;

  public getUser(id_of_user): Promise<User> {
    const url: string = `${this.apiUrl}/users/${id_of_user}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as User)
      .catch(this.procesError);
  }

  public getVehiclesOfUser(id_of_user): Promise<Vehicle[]> {
    const url: string = `${this.apiUrl}/users/${id_of_user}/vehicles`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }

  public getFavouriteVehiclesOfUser(id_of_user): Promise<Vehicle[]> {
    const url: string = `${this.apiUrl}/users/${id_of_user}/favourite_vehicles`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }

  public getRentsOfUser(id_of_user): Promise<Rent[]> {
    const url: string = `${this.apiUrl}/users/${id_of_user}/rents`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }

  public login(user: User): Promise<AuthenticationResult> {
    return this.authentication('login', user);
  }
  
  public register(user: User): Promise<AuthenticationResult> {
    return this.authentication('register', user);
  }
  
  private authentication(urlname: string, user: User): Promise<AuthenticationResult> {
    const url: string = `${this.apiUrl}/${urlname}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(rezultat => rezultat as AuthenticationResult)
      .catch(this.procesError);
  }


  private procesError(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
