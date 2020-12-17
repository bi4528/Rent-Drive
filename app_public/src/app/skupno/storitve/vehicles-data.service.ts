import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehicle, Review } from '../razredi/vehicle';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDataService {

  constructor(private http: HttpClient) { }

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

  public postVehicle(data: any): Promise<Vehicle> {
    const url: string = `${this.apiUrl}/vehicles`;
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
