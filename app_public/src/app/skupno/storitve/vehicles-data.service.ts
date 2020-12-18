import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage_Browser } from '../razredi/storage';

import { Vehicle, Review } from '../razredi/vehicle';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDataService {

  constructor(private http: HttpClient, @Inject(Storage_Browser) private storage: Storage) { }

  private apiUrl = environment.apiUrl;

  public getVehicle(vehicleId: String):Promise <Vehicle>{
    const url: string = `${this.apiUrl}/vehicles/${vehicleId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle)
      .catch(this.procesError);
  }
  
  /*public getOwner(vehicleId: String):Promise <String>{
    const url: string = `${this.apiUrl}/vehicles/${vehicleId}`;
    return this.owner_id ???
  }*/

  public getVehicles(query:string): Promise<Vehicle[]> {
    const url: string = `${this.apiUrl}/vehicles${query}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }

  public getLength(params): Promise<any>{
    const url: string = `${this.apiUrl}/vehicles/length${params}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as any)
      .catch(this.procesError);
  }

  public postVehicle(data: any): Promise<Vehicle> {
    const url: string = `${this.apiUrl}/vehicles`;

    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };

    return this.http
      .post(url, data)
      .toPromise()
      .then(odgovor => odgovor as Vehicle)
      .catch(this.procesError);
  }


  private procesError(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
