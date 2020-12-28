import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../storitve/validation.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( 
    private vehiclesDataService: VehiclesDataService,
    private router: Router,
    private validationService: ValidationService
    )
  { }

  public cars: Vehicle[];
  public sporocilo: string;

  public category: string;
  public dateFrom: string;
  public dateTo: string;
  public city: string;
  public validation_error: string;

  public filter = () : void => {
    this.validation_error="";
    let writeError=false;
    if (!this.city || !this.dateFrom || !this.dateTo || !this.validationService.validate_city(this.city)){
      this.validation_error = this.validation_error.concat("No blanks should be left and city should only have letters.\n");
      writeError = true;
    }
    if ( !this.validationService.validate_dates(this.dateFrom, this.dateTo)){
      this.validation_error = this.validation_error.concat("Date from must be before date to, or can you travel trough time?.\n");
      writeError = true;
    }

    if(writeError){
      this.openModal();
    }
    else {
      this.router.navigate(['/search'], {queryParams: {city: this.city, dateFrom: this.dateFrom, dateTo: this.dateTo, page: "1"} });
    }
  }

  private getVehicles = () : void => {
    this.sporocilo = "Searching for cars";
    this.vehiclesDataService
      .getVehicles('')
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
        this.slides = this.chunk(this.cars, 4);
        console.log(this.slides);
      });
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  public activeslide=true;
  public isActive(): boolean {
    if(this.activeslide){
      this.activeslide=false;
      return true;
    }
    else{
      return false;
    }
  }


  ngOnInit(): void {
    this.activeslide=true;
    this.getVehicles();
  }

}
