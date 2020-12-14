import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { HistoryService } from '../../storitve/history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService, private historyService: HistoryService) { }


  private login = (): void => {

    this.alert_error = "";
    if (
      !this.user.email ||
      !this.user.password
    ) {
      this.alert_error = "To proceed you have to insert all data";
    } else {

      this.alert_error = "Trying to login";
      this.avtentikacijaStoritev
        .login(this.user)
        .then(() => {
          this.router.navigateByUrl(
            this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
          )
        })
        .catch(sporocilo => this.alert_error = sporocilo);
    }
  }

  public vrniUporabnika(): string {
    const { username } = this.avtentikacijaStoritev.get_current_user();
    return username ? username : 'Guest';
  }

  alert_error: String;
  user: User;


  ngOnInit(): void {
  }

}
