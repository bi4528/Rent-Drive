import { Component, OnInit } from '@angular/core';
import {latLng} from 'leaflet';
import {User} from '../../razredi/user';
import { PovezavaService } from '../../storitve/povezava.service';
import {WeatherService} from '../../storitve/weather.service';

@Component({
  selector: 'app-nearby-vreme',
  templateUrl: './nearby-vreme.component.html',
  styleUrls: ['./nearby-vreme.component.css']
})
export class NearbyVremeComponent implements OnInit {

  constructor( private weatherService: WeatherService, private povezavaStoritev: PovezavaService) { }

  condition = false;
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  weather: any = {
    location: {
      name: 'Ljubljana',
      country: 'Slovenia'
    }
  };

  ngOnInit(): void {
  }

  setWeather(): void {
    this.pridobiWeather();
  }

  private pridobiWeather(): void {
    this.weatherService
      .getWeather()
      .then(vreme => {
        this.weather = vreme;
        this.condition = true;
      });

  }

}

