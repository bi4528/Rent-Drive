import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../razredi/user';
import { Vehicle } from '../../razredi/vehicle';
import { Rent } from '../../razredi/rent';
import { UsersDataService } from '../../storitve/users-data.service';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,private pot: ActivatedRoute, private usersDataService: UsersDataService, private vehiclesDataService: VehiclesDataService, private avtentikacijaStoritev: AuthenticationService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
        console.log(this.user);
      });
  }


  private get_vehicles_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getVehiclesOfUser(id_of_user)
      .then((data: Vehicle[]) => {
        this.alert_error = (data.length > 0) ? "" : "No cars found";
        this.owned_cars = data;
        if(this.owned_cars.length == 0) {
          var empty_vehicle = this.get_empty_vehicle();
          empty_vehicle.make = "Add your vehicle";
          empty_vehicle.images.push("car_1.jpg");
          this.owned_cars = [empty_vehicle];
          this.show_controls = false;
        }
      });
  }

  private get_favourite_vehicles_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getFavouriteVehiclesOfUser(id_of_user)
      .then((data: Vehicle[]) => {
        this.alert_error = (data.length > 0) ? "" : "No favourite cars found";
        this.favourite_cars = data;
        if (this.favourite_cars.length == 0) {
          var empty_vehicle = this.get_empty_vehicle();
          empty_vehicle.make = "Add a favourite vehicle";
          empty_vehicle.images.push("car_1.jpg");
          this.favourite_cars = [empty_vehicle];
        }
      });
  }

  private get_rents_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getRentsOfUser(id_of_user)
      .then((data: Rent[]) => {
        this.alert_error = (data.length > 0) ? "" : "No rents found";
        this.rents = data;
      });
  }

  private checkIfProfileIsUserLogged = (): void => {
    var current_user = this.avtentikacijaStoritev.get_current_user();
    this.is_profile_of_logged_user = current_user._id == this.id_of_user;
    this.show_controls = current_user._id == this.id_of_user;
  }

  private get_empty_vehicle = ():Vehicle => {
    return {
      make: "",
      images: [],
      _id: "",
      owner_id: "",
      model: "",
      typeoffuel: "",
      category: "",
      hp: 0,
      maxspeed: 0,
      acceleration: 0,
      consumption: 0,
      seats: 0,
      doors: 0,
      AirConditioning: "",
      Navigation: "",
      USB: "",
      AUX: "",
      parkingsensors: "",
      autopilot: "",
      bluetooth: "",
      accessibility: "",
      description: "",
      price: 0,
      country: "",
      city: "",
      addres: "",
      zip: 0,
      date: [],
      reviews: [],
      luggage: 0,
      minage: 0,
    };
  }
  private get_empty_rent = (): Rent => {
    return {
      user_id: "",
      vehicle_id: "",
      date_from: new Date,
      date_to: new Date,
    };
  }

  public logout = (): void => {
    this.avtentikacijaStoritev.logout();
    this.router.navigateByUrl("/");
  } 
  
  public delete_user = (): void => {
    this.usersDataService.deleteUser(this.user).then(() => {
      this.avtentikacijaStoritev.logout();
      this.router.navigateByUrl("/");
    });
  }


  public id_of_user: String;
  public alert_error: String;
  public user: User;
  public owned_cars: Vehicle[];
  public favourite_cars: Vehicle[];
  public rents: Rent[];
  public is_profile_of_logged_user: Boolean;
  public show_controls: Boolean;

  ngOnInit(): void {

    this.id_of_user = this.pot.snapshot.paramMap.get('idUser');
    console.log(this.id_of_user);
    this.checkIfProfileIsUserLogged();
    this.get_user_data(this.id_of_user);
    this.get_vehicles_of_user(this.id_of_user);
    this.get_rents_of_user(this.id_of_user);
    this.get_favourite_vehicles_of_user(this.id_of_user);
  }

}
