import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../razredi/user';
import { Vehicle } from '../razredi/vehicle';
import { Rent } from '../razredi/rent';
import { AuthenticationResult } from '../razredi/authentication-result';
import { Storage_Browser } from '../razredi/storage';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public addSampleData(): Promise<any> {
    const url: string = `${this.apiUrl}/db/`;
    return this.http
      .post(url, null)
      .toPromise()
      .then(response => response as any)
      .catch(this.procesError);
  }

  public deleteAllData(): Promise<any> {
    const url: string = `${this.apiUrl}/db/`;
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.procesError);
  }

  private procesError(napaka: any): Promise<any> {
    return Promise.reject(napaka.error.message || napaka);
  }
}
