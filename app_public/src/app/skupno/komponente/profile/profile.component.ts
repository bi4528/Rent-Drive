import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../razredi/user';
import { Review, Vehicle } from '../../razredi/vehicle';
import { Rent } from '../../razredi/rent';
import { UsersDataService } from '../../storitve/users-data.service';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RentedDataService } from "../../storitve/rented-data.service";
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private pot: ActivatedRoute,
    private usersDataService: UsersDataService,
    private vehiclesDataService: VehiclesDataService,
    private povezavaStoritev: PovezavaService,
    private avtentikacijaStoritev: AuthenticationService,
    private rentedService: RentedDataService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.user = data;
      }).catch(() => { this.router.navigateByUrl("/error"); });
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  private get_vehicles_of_user = (id_of_user: String): void => {
    if (this.jePovezava()) {
      this.alert_error = "Searching for cars";
      this.usersDataService
        .getVehiclesOfUser(id_of_user)
        .then((data: Vehicle[]) => {

          this.alert_error = (data.length > 0) ? "" : "";
          this.owned_cars = data;
          if (this.owned_cars.length == 0) {
            var empty_vehicle = this.get_empty_vehicle();
            empty_vehicle.make = "Add your vehicle";
            empty_vehicle.images.push("car_1.jpg");
            this.owned_cars = [empty_vehicle];
            this.show_controls = false;
          } else {
            this.show_controls = this.is_logged_or_admin_user();
          }
        });
    }
  }

  private get_reviews_of_user = (id_of_user: String): void => {
    if (this.jePovezava()) {
      this.alert_error = "Searching for cars";
      this.vehiclesDataService
        .getVehicles('')
        .then((data) => {
          this.alert_error = (data.length > 0) ? "" : "";
          this.vehicles_of_reviews = [];
          this.user_reviews = [];
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].reviews.length; j++) {
              if (data[i].reviews[j].user_id == id_of_user) {
                this.vehicles_of_reviews.push(data[i]);
                this.user_reviews.push(data[i].reviews[j]._id);
              }
            }
          }
        }).catch((er) => { console.log(er) });
    }
  }

  private get_favourite_vehicles_of_user = (id_of_user: String): void => {

    if (this.jePovezava()) {
      this.alert_error = "Searching for favourite vehicles";
      this.usersDataService
        .getFavouriteVehiclesOfUser(id_of_user)
        .then((data: Vehicle[]) => {
          this.alert_error = (data.length > 0) ? "" : "";
          this.favourite_cars = data;
          if (this.favourite_cars.length == 0) {
            var empty_vehicle = this.get_empty_vehicle();
            empty_vehicle.make = "Add a favourite vehicle";
            empty_vehicle.images.push("car_1.jpg");
            this.favourite_cars = [empty_vehicle];
          }
        });
    }
  }

  private get_rents_of_user = (id_of_user: String): void => {

    if (this.jePovezava()) {
      if (this.is_logged_or_admin_user()) {
        this.alert_error = "Searching for rents";
        this.usersDataService
          .getRentsOfUser(id_of_user)
          .then((data: Rent[]) => {
            //this.alert_error = (data.length > 0) ? "" : "No rents found"; 
            this.rents = data;
          });
      }
    }
  }

  private checkIfProfileIsUserLogged = (): void => {
    var current_user = this.avtentikacijaStoritev.get_current_user();
    if (current_user != null) this.is_profile_of_logged_user = current_user._id == this.id_of_user;
  }

  private get_empty_vehicle = (): Vehicle => {
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

  public logout = (): void => {
    this.avtentikacijaStoritev.logout();
    this.router.navigateByUrl("/");
  }

  public delete_user = (): void => {

    if (this.jePovezava()) {

      if(this.owned_cars){
        for (let i = 0; i < this.owned_cars.length; i++) {
          this.delete_vehicle(this.owned_cars[i]._id);
        }
      }
      if(this.user_reviews){
        for (let i = 0; i < this.user_reviews.length; i++) {
          this.delete_review_of_user(this.vehicles_of_reviews[i], this.user_reviews[i]);
        }
      }

      this.usersDataService.deleteUser(this.user).then(() => {
        this.avtentikacijaStoritev.logout();
        this.router.navigateByUrl("/");
      });
    }
  }

  public is_logged_or_admin_user(): Boolean {
    if (this.avtentikacijaStoritev.get_current_user()==null) return false;
    return this.avtentikacijaStoritev.get_current_user().is_admin || this.is_profile_of_logged_user;
  }

  public edit_user(): void {
    this.router.navigateByUrl("/users/edit/" + this.user._id);
  }

  public show_vehicle = (id_vehicle): void => {
    this.router.navigateByUrl("/vehicles/" + id_vehicle);
  }
  public delete_rent = (id_rent): void => {

    if (this.jePovezava()) {
      this.rentedService.deleteRented(id_rent).then(() => {
        this.get_rents_of_user(this.id_of_user);
      });
    }
  }
  public delete_vehicle = (id_vehicle): void => {

    if (this.jePovezava()) {
      this.vehiclesDataService.deleteVehicle(id_vehicle).then(() => {
        this.get_vehicles_of_user(this.id_of_user);
      });
    }
  }

  public delete_review_of_user = (vehicle, id_review): void => {

    if (this.jePovezava()) {
      this.vehiclesDataService.deleteReview(vehicle, id_review).then(() => {
        this.get_reviews_of_user(this.id_of_user);
      }).catch((er) => { console.log(er) });
    }
  }

  public show_chart = (id_user): void => {
    this.router.navigateByUrl("/users/profiles/" + id_user + "/chart");
  }

  public id_of_user: String;
  public alert_error: String;
  public user: User;
  public owned_cars: Vehicle[];
  public vehicles_of_reviews: Vehicle[];
  public user_reviews: String[]
  public favourite_cars: Vehicle[];
  public rents: Rent[];
  public is_profile_of_logged_user: Boolean;
  public show_controls: Boolean;

  ngOnInit(): void {
    this.owned_cars=[];
    this.user_reviews=[];
    this.id_of_user = this.pot.snapshot.paramMap.get('idUser');
    this.checkIfProfileIsUserLogged();
    this.get_user_data(this.id_of_user);
    this.get_vehicles_of_user(this.id_of_user);
    if (this.id_of_user != null) this.get_reviews_of_user(this.id_of_user);
    this.get_rents_of_user(this.id_of_user);
    this.get_favourite_vehicles_of_user(this.id_of_user);
  }

}
