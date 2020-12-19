import { Component, OnInit } from '@angular/core';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AuthenticationService } from '../../storitve/avtentikacija.service';


const URL = 'http://localhost:3000/upload';  //TO SE MORA SPREMENITI ODVISNO OD OKOLJE

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})


export class PublishComponent implements OnInit {

  constructor(private vehiclesDataService: VehiclesDataService, private router: Router, private avtentikacijaStoritev: AuthenticationService) { }

  public user_logged:boolean = true;
  public error:string = "";

  public newVehicle = {
    images: [],
    owner_id: '1',
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
  public defineOnOff(data:any) : string {
    return data ? "on" : "off";
  }

  public addNewVehicle() : void {
    this.defineFuel(this.newVehicle);
    this.defineCategory(this.newVehicle);
    this.defineMinAge(this.newVehicle);
    //console.log(this.newVehicle);
    this.newVehicle.AirConditioning=this.defineOnOff(this.newVehicle.AirConditioning);
    this.newVehicle.Navigation=this.defineOnOff(this.newVehicle.Navigation);
    this.newVehicle.accessibility=this.defineOnOff(this.newVehicle.accessibility);
    this.newVehicle.parkingsensors=this.defineOnOff(this.newVehicle.parkingsensors);
    this.newVehicle.USB=this.defineOnOff(this.newVehicle.USB);
    this.newVehicle.AUX=this.defineOnOff(this.newVehicle.AUX);
    this.newVehicle.bluetooth=this.defineOnOff(this.newVehicle.bluetooth);
    this.newVehicle.autopilot=this.defineOnOff(this.newVehicle.autopilot);
    this.newVehicle.owner_id = this.avtentikacijaStoritev.get_current_user()._id;

    console.log(this.newVehicle);
    this.vehiclesDataService
      .postVehicle(this.newVehicle)
      .then((data) => {
        console.log("PUBLISED", data);
        this.router.navigateByUrl("/");
      })
      .catch(napaka => this.error = napaka);
  }

  public verificateData() : void {
    //console.log(checkData());
  };

  //public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  ngOnInit(): void {
    /*this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
    };*/
    if (!this.avtentikacijaStoritev.is_logged()){
      this.router.navigateByUrl("/");
    }
  }

}
