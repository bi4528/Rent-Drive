import { Component } from '@angular/core';

import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-leaflet-mapa',
  templateUrl: './nearby-mapa.component.html'
})
export class NearbyMapaComponent {
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
}
