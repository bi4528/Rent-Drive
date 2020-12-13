import { Component, OnInit } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private vehiclesDataService: VehiclesDataService) { }

  public cars: Vehicle[];
  public sporocilo: string;

  private getVehicles = () : void => {
    this.sporocilo = "Searching for cars";
    this.vehiclesDataService
      .getVehicles()
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
      });
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}
