import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../storitve/validation.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router,
    private validationService: ValidationService, private usersDataService: UsersDataService) { }

  public recover_password = (): void => {
    if (this.email_of_user == "") {
      this.alert_error = "Insert an email."
    } else if (!this.validationService.validate_email(this.email_of_user)) {
      this.alert_error = "Email is not valid."
    } else {
      this.usersDataService.check_if_email_exists(this.email_of_user).then((exists) => {
        if(exists != null && exists == false) {
          this.alert_error = "Email does not exist."
        } else {
          this.alert_error = ""
          this.usersDataService.recover_password_using_email(this.email_of_user).then((info) => {
            if (info != null) {
              this.alert_error = "Email sent.";
            } else {
              this.alert_error = "Email not sent."
            }
          }).catch(message => this.alert_error = message)
        }
      }).catch(message => this.alert_error = message);

    }

  }

  public email_of_user: string;
  public alert_error: string;

  ngOnInit(): void {
    this.email_of_user = "";
    this.alert_error = "";
  }

}
