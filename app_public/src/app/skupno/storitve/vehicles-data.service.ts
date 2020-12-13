import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vehicle, Review } from '../razredi/vehicle';
//TODO import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDataService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api'; //environment.apiUrl;

  public getVehicles(): Promise<Vehicle[]> {
    const url: string = `${this.apiUrl}/vehicles`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Vehicle[])
      .catch(this.procesError);
  }


  private procesError(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
