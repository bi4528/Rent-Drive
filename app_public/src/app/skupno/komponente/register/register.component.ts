import { InjectFlags } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../razredi/user';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
declare var validate:  any;
declare var register: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private usersDataService: UsersDataService,
    private avtentikacijaStoritev: AuthenticationService
  ) { }
  
  alert_error: String;
  @ViewChild("repeatPassword") repeatPassword;

  public user: User = {
    _id : "",
    username: "",
    firstname : "" ,
    lastname : "" ,
    phone_number : "" ,
    email : "" ,
    password : "" ,
    profile_picture : "" ,
    location : "" ,
    favourite_vehicles_ids : [] ,
  };

  
  public register = (): void => {
    
    this.alert_error = "";
    console.log(this.user);
    console.log(this.repeatPassword.nativeElement.value);
    console.log(this.user.  password);
    if (
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email ||
      !this.user.username ||
      !this.user.password ||
      !this.repeatPassword.nativeElement.value ||
      (this.repeatPassword.nativeElement.value != this.user.password)
    ) {
      this.alert_error = "Fill all the input fields to register successfully!";
    } else {
      this.usersDataService.register(this.user) //createUser returns ERR_CONNECTION REFUSED
      .then(()=> {this.router.navigateByUrl("/")})
      .catch(sporocilo => this.alert_error = sporocilo)
    }
  }

  ngOnInit(): void {
  }

}
