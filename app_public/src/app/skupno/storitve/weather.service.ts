import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getWeather(): Promise<any> {

    const url: string = `${this.apiUrl}/nearby/weather`;

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




