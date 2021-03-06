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

  public updateVehicleData(vehicle: Vehicle): Promise <Vehicle>{
    const url: string = `${this.apiUrl}/vehicles/${vehicle._id}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .put(url, vehicle, httpLastnosti)
      .toPromise()
      .then(response => response as Vehicle)
      .catch (this.procesError);
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
      .post(url, data, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Vehicle)
      .catch(this.procesError);
  }

  public vehicleImagesUpload(data: any){
    const url: string = `${this.apiUrl}/vehicles/imagesUpload`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .post(url,data, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as string)
      .catch(this.procesError);
  }

  public postReview(data: any, vehicleId: string): Promise<Review> {
    const url: string = `${this.apiUrl}/vehicles/${vehicleId}/reviews/`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .post(url, data, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Review)
      .catch(this.procesError);
  }

  public deleteReview(vehicle: Vehicle, reviewId:String): Promise<void> {
    const url: string = `${this.apiUrl}/vehicles/${vehicle._id}/reviews/${reviewId}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then()
      .catch(this.procesError);
  }

  public deleteVehicle(vehicle_id: string): Promise<void> {
    const url: string = `${this.apiUrl}/vehicles/${vehicle_id}`;
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('rentdrive-token')}`
      })
    };
    return this.http
      .delete(url, httpLastnosti)
      .toPromise()
      .then()
      .catch(this.procesError);
  }

  private procesError(napaka: any): Promise<any> {
    console.error('Pri??lo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
