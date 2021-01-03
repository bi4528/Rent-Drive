import { Component } from '@angular/core';
import {icon, LatLng, latLng, Layer, marker, tileLayer} from 'leaflet';
import {MarkeriService} from "../../storitve/markeri.service";
/*import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';*/
import { PovezavaService } from '../../storitve/povezava.service';


@Component({
  selector: 'app-leaflet-mapa',
  templateUrl: './nearby-mapa.component.html'
})
export class NearbyMapaComponent {

  constructor( private markeriService: MarkeriService, private povezavaStoritev: PovezavaService) { }

  public locations: any;
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

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
    //this.pridobiMarkere();
  }

  setMarkeri(): void {

    //console.log(this.locations)

    this.cars = JSON.parse(this.locations);
    //console.log(this.cars);

    this.cars.forEach((car) =>{

      //console.log(car);
      var distance = latLng(this.lat, this.lng).distanceTo([car.LAT, car.LNG]);

      if (distance < 3000.00) {

        const newMarker = marker(
          [car.LAT, car.LNG],
          {
            title: "Tukaj se nahaja " + car.make + " " + car.model,
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'assets/icons/marker-icon.png',
              shadowUrl: 'assets/icons/marker-shadow.png'
            })
          }
        );
        this.markers.push(newMarker);

      }
    });
  }

  // Output binding for center
  onCenterChange(center: LatLng) {
    setTimeout(() => {
      this.lat = center.lat;
      this.lng = center.lng;
    })

  }

  public pridobiMarkere(): void {
    this.markeriService
      .getLocations()
      .then(lokacije => {
        this.locations = JSON.stringify(lokacije);
        this.setMarkeri();
      });

  }
}
