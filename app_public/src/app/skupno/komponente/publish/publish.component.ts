import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ModalComponent } from '../modal/modal.component';
import { ValidationService } from '../../storitve/validation.service';
import { HttpClient } from '@angular/common/http';
import { PovezavaService } from '../../storitve/povezava.service';


const URL = 'http://localhost:3000/upload';  //TO SE MORA SPREMENITI ODVISNO OD OKOLJE

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})


export class PublishComponent implements OnInit {

  constructor(
    private vehiclesDataService: VehiclesDataService,
    private router: Router,
    private avtentikacijaStoritev: AuthenticationService,
    private validationService: ValidationService,
    private http: HttpClient,
    private povezavaStoritev: PovezavaService
    )
  { }

  public user_logged:boolean = true;
  public error:string = "";
  public validation_error:string = "";
  public multipleImages=[];
  @ViewChild('inputEl') public inputEl;

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
    minage: ''
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
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

  public selectImage(event){
    if (event.target.files.length > 0) {
      console.log(event.target.files)
      this.multipleImages = event.target.files;
    }
  }

  public isElectric(event) :void {
    console.log(this.newVehicle.typeoffuel);
    if (this.newVehicle.typeoffuel=='4'){
      this.inputEl.nativeElement.disabled = true;
    }
    else {
      this.inputEl.nativeElement.disabled = false;
    }
  }

  public addNewVehicle() : void {
    this.validation_error="";
    let writeError= false;
    this.defineFuel(this.newVehicle);
    this.defineCategory(this.newVehicle);
    this.defineMinAge(this.newVehicle);
    console.log(this.newVehicle);


    if ( !this.validationService.validate_vehicle_make(this.newVehicle.make) ) {
      this.validation_error = this.validation_error.concat("Make should have only letters.\n");
      writeError = true;
    }
    if (!this.validationService.validate_not_empty_string(this.newVehicle.model)) {
      this.validation_error = this.validation_error.concat("Model text field should not be let empty.\n");
      writeError=true;
    }
    if (!this.validationService.validate_vehicle_horespower(this.newVehicle.hp)){
      this.validation_error = this.validation_error.concat("Horespower should be only numbers.\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_speed(this.newVehicle.maxspeed)){
      this.validation_error = this.validation_error.concat("Maxspeed should be only numbers.\n");
      writeError = true;
    }
    if (!this.validationService.validate_acceleration(this.newVehicle.acceleration)){
      this.validation_error = this.validation_error.concat("Acceleration should be written in the next format => number.number or just a number(s).\n");
      writeError = true;
    }
    if (!this.validationService.validate_acceleration(this.newVehicle.consumption) && this.newVehicle.typeoffuel!="Electric"){
      this.validation_error = this.validation_error.concat("Consumption field must not be empty, except if the vehicle is electric\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_doors_seats(this.newVehicle.seats)){
      this.validation_error = this.validation_error.concat("Number of seats is only one number.\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_doors_seats(this.newVehicle.doors)){
      this.validation_error = this.validation_error.concat("Number of doors is only one number.\n");
      writeError = true;
    }
    if(!this.newVehicle.minage){
      this.validation_error = this.validation_error.concat("Please select minimum - age.\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_price_per_day(this.newVehicle.price)){
      this.validation_error = this.validation_error.concat("Price must be between 1 and 5000.\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_luggage(this.newVehicle.luggage)){
      this.validation_error = this.validation_error.concat("Luggage capacity must be a positive number\n");
      writeError = true;
    }
    if (!this.validationService.validate_not_empty_string(this.newVehicle.addres)){
      this.validation_error = this.validation_error.concat("You must insert an address.\n");
      writeError = true;
    }
    if (!this.validationService.validate_city(this.newVehicle.city)){
      this.validation_error = this.validation_error.concat("City must only contain letters.\n");
      writeError = true;
    }
    if (!this.validationService.validate_vehicle_number_of_doors(this.newVehicle.zip)){
      this.validation_error = this.validation_error.concat("You must insert a zip.\n");
      writeError = true;
    }
    if (!this.validationService.validate_not_empty_string(this.newVehicle.description)){
      this.validation_error = this.validation_error.concat("You must insert a description.\n");
      writeError = true;
    }
    if (!this.validationService.validate_dates(this.newVehicle.date[0], this.newVehicle.date[1])){
      this.validation_error = this.validation_error.concat("Insert valid dates.\n");
      writeError = true;
    }
    var d1 = new Date(this.newVehicle.date[0]);
    var d2 = new Date(this.newVehicle.date[1]);
    var now = new Date();
    if (d1<now || d2<now){
      this.validation_error = this.validation_error.concat("Date already passed!\n");
      writeError = true;
    }

    console.log(this.validation_error);
    if(writeError){
      this.openModal();
    }
    else {
      this.newVehicle.AirConditioning=this.defineOnOff(this.newVehicle.AirConditioning);
      this.newVehicle.Navigation=this.defineOnOff(this.newVehicle.Navigation);
      this.newVehicle.accessibility=this.defineOnOff(this.newVehicle.accessibility);
      this.newVehicle.parkingsensors=this.defineOnOff(this.newVehicle.parkingsensors);
      this.newVehicle.USB=this.defineOnOff(this.newVehicle.USB);
      this.newVehicle.AUX=this.defineOnOff(this.newVehicle.AUX);
      this.newVehicle.bluetooth=this.defineOnOff(this.newVehicle.bluetooth);
      this.newVehicle.autopilot=this.defineOnOff(this.newVehicle.autopilot);
      this.newVehicle.owner_id = this.avtentikacijaStoritev.get_current_user()._id;
      if (this.newVehicle.typeoffuel==="Electric"){
        this.newVehicle.consumption="0";
      }

      const formData = new FormData();
      for(let img of this.multipleImages){
        formData.append('files', img);
      }

      for(let i=0; i<this.multipleImages.length; i++){
        console.log(this.multipleImages[i].name);
        this.newVehicle.images.push(this.multipleImages[i].name);
      }
      console.log(formData);
      this.vehiclesDataService
      .vehicleImagesUpload(formData)
      .then((data) => {
        console.log("IMAGES WERE SUCCESFULY UPLOADED", data);
        this.vehiclesDataService
        .postVehicle(this.newVehicle)
        .then((data) => {
          console.log("PUBLISED", data);
          this.router.navigateByUrl("/");
        })
        .catch(napaka => this.error = napaka);
      })
      .catch(napaka => console.log(napaka) );

    }    
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

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
