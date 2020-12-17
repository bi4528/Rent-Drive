import { Component, OnInit } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  public cars: Vehicle[];
  public sporocilo: string;
  public keyword: string;
  public filter_text: string;

  public filter = () : void => {
    this.vehiclesDataService
      .getVehicles("?value="+this.keyword+"")
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.filter_text = "<H3>Filtered by keyword: \"" + this.keyword + "\"</H3>";
        this.cars = data;
      });
  }

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
          this.filter_text="<H3>Filtered by city of pick-up: \"" + params.city + "\", date from: \"" + params.dateFrom + "\" and date to: \"" + params.dateTo + "\"</H3>";
          this.getVehicles(url);
        }
        else if(params.category){
          let url="?category="+params.category+"";
          this.filter_text="<H3>Filtered by category: \"" + params.category.toLowerCase() + "\"</H3>";
          this.getVehicles(url);
        }
        else{
          this.getVehicles("");
          this.filter_text="";
        }
      });

    //this.getVehicles();
  }

}
