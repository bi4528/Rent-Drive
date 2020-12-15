import { Component, OnInit } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private vehiclesDataService: VehiclesDataService, private route: ActivatedRoute) { }

  public cars: Vehicle[];
  public sporocilo: string;

  private getVehicles = (url: string) : void => {
    this.sporocilo = "Searching for cars";
    this.vehiclesDataService
      .getVehicles(url)
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
      });
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params=> {
        if(params.city){
          let url="?city="+params.city+"&dateFrom="+params.dateFrom+"&dateTo="+params.dateTo+"";
          this.getVehicles(url);
        }
        if(params.category){
          let url="?category="+params.category+"";
          this.getVehicles(url);
        }
      });

    //this.getVehicles();
  }

}
