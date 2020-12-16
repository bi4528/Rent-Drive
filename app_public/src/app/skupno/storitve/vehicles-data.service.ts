import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehicle, Review } from '../razredi/vehicle';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDataService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api'; //environment.apiUrl;

  public getVehicles(queryParams:string): Promise<Vehicle[]> {
    const url: string = `${this.apiUrl}/vehicles${queryParams}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }

  public postVehicle(data: any): Promise<any> {
    const url: string = `${this.apiUrl}/vehicles`;
    return this.http
      .post(url, data)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.procesError);
  }


  private procesError(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
