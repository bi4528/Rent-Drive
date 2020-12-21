import { Component, OnInit, ViewChild } from '@angular/core';
import { ValidationService } from '../../storitve/validation.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

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
      this.modal_text = "Insert an email."
      this.openModal();
    } else if (!this.validationService.validate_email(this.email_of_user)) {
      this.modal_text = "Email is not valid."
      this.openModal();
    } else {
      this.usersDataService.check_if_email_exists(this.email_of_user).then((exists) => {
        if(exists != null && exists == false) {
          this.modal_text = "Email does not exist."
          this.openModal();
        } else {
          this.modal_text = ""
          this.usersDataService.recover_password_using_email(this.email_of_user).then((info) => {
            if (info != null) {
              this.modal_text = "Email sent.";
              this.openModal();
            } else {
              this.modal_text = "Email not sent."
              this.openModal();
            }
          }).catch(message => this.modal_text = message)
        }
      }).catch(message => this.modal_text = message);

    }

  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  public email_of_user: string;
  public modal_text: string;

  ngOnInit(): void {
    this.email_of_user = "";
    this.modal_text = "";
  }

}
