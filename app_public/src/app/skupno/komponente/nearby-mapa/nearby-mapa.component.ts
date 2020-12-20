import { Component } from '@angular/core';

import { latLng, LatLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-leaflet-mapa',
  templateUrl: './nearby-mapa.component.html'
})
export class NearbyMapaComponent {

  optionsSpec: any = {
    layers: [{ url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
    zoom: 13,
    center: [ 46.0569, 14.5058 ]
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
  zoomLevels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];
  lat = this.center.lat;
  lng = this.center.lng;

  // Output binding for center
  onCenterChange(center: LatLng): void {
    setTimeout(() => {
      this.lat = center.lat;
      this.lng = center.lng;
    });
  }

  onZoomChange(zoom: number): void {
    setTimeout(() => {
      this.formZoom = zoom;
    });
  }

  doApply(): void {
    this.center = latLng(this.lat, this.lng);
    this.zoom = this.formZoom;
  }
}
