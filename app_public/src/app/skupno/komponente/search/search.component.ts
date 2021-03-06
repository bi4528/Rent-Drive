import { Component, OnInit } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private route: ActivatedRoute,
    private router: Router,
    private povezavaStoritev: PovezavaService
    ) { }

  public cars: Vehicle[];
  public sporocilo: string;
  public keyword: string;
  public filter_text: string;
  public total_items: number;
  public current_page: number;
  public pages: number;
  

  public filter = (): void => {
    if (this.keyword){
      /*
      let params = {value: this.keyword, page: 1};
      this.calculateTotal(params);
      this.current_page = params.page;
      let url = "?value=" + params.value + "&page=" + params.page;
      this.filter_text = "<H3>Filtered by keyword: \"" + this.keyword + "\"</H3>";
      this.getVehicles(url);
      */
      this.current_page=1;
      console.log(this.keyword);
      this.router.navigate(['/search'], { queryParams: { value: this.keyword, page: 1 } });
    }
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
  
  public updatePage = (next_page): void => {

    this.route.queryParams
      .subscribe(params => {
        console.log(next_page);
        if (params.city) {
          this.router.navigate(['/search'], { queryParams: { city: params.city, dateFrom: params.dateFrom, dateTo: params.dateTo, page: next_page } });
        }
        else if (params.category) {
          this.router.navigate(['/search'], { queryParams: { category: params.category, page: next_page } });
        }
        else if (params.value) {
          this.router.navigate(['/search'], { queryParams: { value: params.value, page: next_page } });
        }
        else {
          this.router.navigate(['/search'], { queryParams: { page: next_page } });
        }
      });
  }

  private getVehicles = (url: string, filtered_by: string): void => {
    this.sporocilo = "Searching for cars";

    this.vehiclesDataService
      .getVehicles(url)
      .then(data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
        this.filter_text = filtered_by;
      });
  }

  private calculateTotal = (params: any): void => {
    let url = "";
    if (params.city) {
      url = "?city=" + params.city + "&dateFrom=" + params.dateFrom + "&dateTo=" + params.dateTo;
    }
    else if (params.category) {
      url = "?category=" + params.category + "&page=";
    }
    else if (params.value) {
      url = "?value=" + params.value + "&page=";
    }

    this.vehiclesDataService
      .getLength(url)
      .then(data => {
        this.total_items = data.number_vehicles;
        this.pages = Math.floor(this.total_items / 12) + 1;
      });

  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.calculateTotal(params);
        this.current_page = params.page;
        if (params.city) {
          let url = "?city=" + params.city + "&dateFrom=" + params.dateFrom + "&dateTo=" + params.dateTo + "&page=" + params.page;
          let filtertext = "<H3>Filtered by city of pick-up: \"" + params.city + "\", date from: \"" + params.dateFrom + "\" and date to: \"" + params.dateTo + "\"</H3>";
          this.getVehicles(url, filtertext);
        }
        else if (params.category) {
          let url = "?category=" + params.category + "&page=" + params.page;
          let filtertext = "<H3>Filtered by category: \"" + params.category.toLowerCase() + "\"</H3>";
          this.getVehicles(url, filtertext);
        }
        else if (params.value) {
          let url = "?value=" + params.value + "&page=" + params.page;
          let filtertext = "<H3>Filtered by keyword: \"" + this.keyword + "\"</H3>";
          this.getVehicles(url, filtertext);
        }
        else {
          let filtertext = "";
          this.getVehicles("?page=" + params.page, filtertext);
        }
      });
  }

}
