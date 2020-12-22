import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MarkeriService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getLocations(): Promise<any> {

    const url: string = `${this.apiUrl}/nearby/locations`;

    return this.httpClient
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);

  }

  private obdelajNapako(napaka: any): Promise <any> {
    console.error ('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);

  }
}
