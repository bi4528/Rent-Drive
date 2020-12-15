import { Component, OnInit } from '@angular/core';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';


@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  constructor(private vehiclesDataService: VehiclesDataService) { }

  public user_logged:boolean = true;
  public error:string = "";

  public newVehicle = {
    images: [],
    owner_id: '',
    make: '',
    model: '',
    typeoffuel: '',
    category: '',   
    hp: '',
    maxspeed: '',    
    acceleration: '',
    consumption: '',
    seats: '',
    doors: '',
    AirConditioning: '',
    Navigation: '',
    USB: '',
    AUX: '',
    parkingsensors: '',
    autopilot: '',
    bluetooth: '',
    accessibility: '',
    description: '',
    price: '',
    country: '',
    city: '',
    addres: '',
    zip: '',
    date: [],
    reviews: [],
    luggage: '',
    minage: '',
  }

  private defineFuel(data:any) : void {
    switch(data.typeoffuel){
      case 1:
        data.typeoffuel="Petrol"
        break;
      case 2:
        data.typeoffuel="Diesel"
        break;
      case 3:
        data.typeoffuel="Hybrid"
        break;
      case 4:
        data.typeoffuel="Electric"
        break;
      case 5:
        data.typeoffuel="LPG"
        break;
    }
  }
  public defineCategory(data:any) : void {
    switch(data.category){
      case 1:
        data.category="Saloon"
        break;
      case 2:
        data.category="Estate"
        break;
      case 3:
        data.category="Hatchback"
        break;
      case 4:
        data.category="Coupe"
        break;
      case 5:
        data.category="SUV"
        break;
      case 6:
        data.category="Pick-up"
        break;
    }
  }
  public defineMinAge(data:any) : void {
    switch(data.minage){
      case 1:
        data.minage="15"
        break;
      case 2:
        data.minage="16"
        break;
      case 3:
        data.minage="18"
        break;
      case 4:
        data.minage="21"
        break;
    }
  }

  public addNewVehicle() : void {
    this.defineFuel(this.newVehicle);
    this.defineCategory(this.newVehicle);
    this.defineMinAge(this.newVehicle);
    console.log(this.newVehicle);
    this.vehiclesDataService
      .postVehicle(this.newVehicle)
      .then((data) => {
        console.log("PUBLISED", data);
      })
      .catch(napaka => this.error = napaka);
  }

  ngOnInit(): void {
  }

}
