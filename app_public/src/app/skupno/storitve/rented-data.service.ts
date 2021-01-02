import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage_Browser} from "../razredi/storage";
import {environment} from "../../../environments/environment";
import {Rent} from "../razredi/rent";

@Injectable({
  providedIn: 'root'
})
export class RentedDataService {

  constructor(private http: HttpClient, @Inject(Storage_Browser) private storage: Storage) { }

  //message: string;

  private apiUrl = environment.apiUrl;

  public createRented(data): Promise<Rent> {
    const url: string = `${this.apiUrl}/rented/`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .post(url, data, httpLastnosti)
      .toPromise()
      .then(response => response as Rent)
      .catch(this.procesError);
  }

  public deleteRented(id_of_rented): Promise<Rent> {
    const url: string = `${this.apiUrl}/rented/${id_of_rented}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then(response => response as Rent)
      .catch(this.procesError);
  }

  public getAllRented(): Promise<Rent> {
    const url: string = `${this.apiUrl}/rented/`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Rent)
      .catch(this.procesError);
  }

  public getAllRentedToday(): Promise<Rent> {
    const url: string = `${this.apiUrl}/rented/today`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Rent)
      .catch(this.procesError);
  }

  public getAllRentedTodayExpired(): Promise<Rent> {
    const url: string = `${this.apiUrl}/rented/today-expired`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Rent)
      .catch(this.procesError);
  }

  private procesError(napaka: any): Promise<any> {
    return Promise.reject(napaka.error.message || napaka);
  }
}
