import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../storitve/validation.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../razredi/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, private pot: ActivatedRoute,
    private authenticationService: AuthenticationService, private usersDataService: UsersDataService, private validationService:ValidationService) { }

  public token: string;
  public user: User;
  public repeated_password: string;
  public password: string;
  public alert_error: String;

  public reset_password = (): void => {
    this.alert_error = "";
    if(this.password == null || this.repeated_password == null) {
      this.alert_error = "Please insert a password.";
    } else if (!this.validationService.validate_password(this.password) && !this.validationService.validate_password(this.repeated_password)) {
      this.alert_error = "Passwords are not valid.";
    } else if(this.repeated_password != this.password) {
      this.alert_error = "Passwords are not equal.";
    } else {
      this.user.password = this.password;
      this.usersDataService.reset_password(this.user, this.token).then((user:User) => {
        this.router.navigateByUrl("/users/login");
      });
    }
    
  }

  ngOnInit(): void {

    this.token = this.pot.snapshot.paramMap.get('token');
    if (this.token == null) {
      this.router.navigateByUrl("/");
    } else {
      this.user = this.authenticationService.get_email_from_recover_token(this.token);
    }

  }

}
