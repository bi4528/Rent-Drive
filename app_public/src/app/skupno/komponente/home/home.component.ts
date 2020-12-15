import { Component, OnInit } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private vehiclesDataService: VehiclesDataService, private router: Router) { }

  public cars: Vehicle[];
  public sporocilo: string;

  public category: string;
  public dateFrom: string;
  public dateTo: string;
  public city: string;

  public filter = () : void => {
    this.router.navigate(['/search'], {queryParams: {city: this.city, dateFrom: this.dateFrom, dateTo: this.dateTo} });
  }

  private getVehicles = () : void => {
    this.sporocilo = "Searching for cars";
    this.vehiclesDataService
      .getVehicles('')
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
      });
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}
