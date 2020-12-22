import { Component } from '@angular/core';
import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import {MarkeriService} from "../../storitve/markeri.service";
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';

@Component({
  selector: 'app-leaflet-mapa',
  templateUrl: './nearby-mapa.component.html'
})
export class NearbyMapaComponent {

  constructor( private markeriService: MarkeriService) { }

  public locations: any;

  // Open Street Map definitions
  optionsSpec: any = {
    layers: [{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
    zoom: 11,
    center: [ 46.0477, 14.5151 ]
  };

  // Leaflet bindings
  zoom = this.optionsSpec.zoom;
  center = latLng(this.optionsSpec.center);
  options = {
    layers: [ tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution }) ],
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center)
  };

  // Form bindings
  formZoom = this.zoom;

  lat = this.center.lat;
  lng = this.center.lng;

  markers: Layer[] = [];
  private cars: any;

  addMarker(): void {
    const newMarker = marker(
      [ 46.0569 + 0.1 * (Math.random() - 0.5), 14.5058 + 0.1 * (Math.random() - 0.5) ],
      {
        title: 'Random marker'
      }
    );

    this.markers.push(newMarker);
  }

  removeMarker(): void {
    this.markers.pop();
  }

  ngOnInit(): void {
    this.pridobiMarkere();
    //console.log(this.locations);
    //this.condition = false;
  }

  setMarkeri(): void {
    this.pridobiMarkere();
    console.log(this.locations)

    this.cars = JSON.parse(this.locations);
    console.log(this.cars);

    this.cars.forEach((car) =>{

      console.log(car);
      var distance = this.options.center.distanceTo([car.LAT, car.LNG]);

      if (distance < 3000.00) {

        const newMarker = marker(
          [car.LAT, car.LNG],
          {
            title: "Tukaj se nahaja " + car.make + " " + car.model,
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'marker-icon.png',
              shadowUrl: 'marker-shadow.png'
            })
          }
        );
        this.markers.push(newMarker);
        //console.log(distance);
      }
    });
  }

  private pridobiMarkere(): void {
    this.markeriService
      .getLocations()
      .then(lokacije => this.locations = JSON.stringify(lokacije));

  }
}
