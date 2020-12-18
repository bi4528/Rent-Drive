import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../storitve/validation.service';
import { UsersDataService } from '../../storitve/users-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private validationService: ValidationService, private usersDataService: UsersDataService) { }

  public recover_password(): void {
    if(this.email == "") {
      this.alert_error = "Insert an email."
    } else if (this.validationService.validate_email(this.email)) {
      this.alert_error = "Email is not valid."

    } else {

      this.usersDataService.check_if_email_exists(this.email).then((exists) => {
        if(exists != null && exists == false) {
          this.alert_error = "Email does not exist."
        } else {

        }
      })
        .catch(sporocilo => this.alert_error = sporocilo);

    }

  }

  public email: string;
  public alert_error: string;

  ngOnInit(): void {
    this.email = "";
    this.alert_error = "";
  }

}
