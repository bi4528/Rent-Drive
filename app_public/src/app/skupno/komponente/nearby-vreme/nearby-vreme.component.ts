import { Component, OnInit } from '@angular/core';
import {latLng} from 'leaflet';
import {User} from '../../razredi/user';
import {WeatherService} from '../../storitve/weather.service';

@Component({
  selector: 'app-nearby-vreme',
  templateUrl: './nearby-vreme.component.html',
  styleUrls: ['./nearby-vreme.component.css']
})
export class NearbyVremeComponent implements OnInit {

  constructor( private weatherService: WeatherService) { }

  condition = false;

  weather: any = {
    location: {
      name: 'Ljubljana',
      country: 'Slovenia'
    }
  };
  public weather1: string;

  vreme = {
    request: {
      type: 'City',
      query: 'Ljubljana, Slovenia',
      language: 'en',
      unit: 'm'
    },
    location: {
      name: 'Ljubljana',
      country: 'Slovenia',
      region: 'Bohinj',
      lat: '46.055',
      lon: '14.514',
      timezone_id: 'Europe/Ljubljana',
      localtime: '2020-11-22 13:41',
      localtime_epoch: 1606052460,
      utc_offset: '1.0'
    },
    current: {
      observation_time: '12:41 PM',
      temperature: 5,
      weather_code: 113,
      weather_icons: [
        'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'
      ],
      weather_descriptions: [
        'Sunny'
      ],
      wind_speed: 7,
      wind_degree: 120,
      wind_dir: 'ESE',
      pressure: 1031,
      precip: 0,
      humidity: 41,
      cloudcover: 0,
      feelslike: 5,
      uv_index: 2,
      visibility: 10,
      is_day: 'yes'
    }
  };

  ngOnInit(): void {
    this.pridobiWeather();
    //this.condition = false;
  }

  setWeather(): void {
    this.pridobiWeather();
    this.condition = true;
  }

  private pridobiWeather(): void {
    this.weatherService
      .getWeather()
      .then(vreme => this.weather = vreme);

  }

}

