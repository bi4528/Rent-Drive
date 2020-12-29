import { Component, OnInit, Input } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private pot: ActivatedRoute,
    private povezavaStoritev: PovezavaService,
    private router: Router,
    private usersDataService: UsersDataService,
    private avtentikacijaStoritev: AuthenticationService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.user = null;
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.user = data;
      });
  }
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public update_user_data = (): void => {

    if (this.avtentikacijaStoritev.is_logged() && (this.user._id == this.avtentikacijaStoritev.get_current_user()._id || this.avtentikacijaStoritev.get_current_user().is_admin)) {
      this.alert_error = "Updating user data";

      if (this.profile_picture_file!=null){
        var fd = new FormData();
      fd.append('profile_picture', this.profile_picture_file, this.profile_picture_file.name);
      this.usersDataService.updateProfilePicture(fd).then((filename: string) => {
        this.user.profile_picture = filename;
        this.usersDataService
          .updateUserData(this.user)
          .then((user: User) => {
            this.alert_error = (user != null) ? "" : "Failed to update user";
            this.user = user;
            this.id_of_user = this.user._id;
            this.router.navigateByUrl("/users/profiles/" + this.user._id)
          });
      });
      } else {
        this.usersDataService
          .updateUserData(this.user)
          .then((user: User) => {
            this.alert_error = (user != null) ? "" : "Failed to update user";
            this.user = user;
            this.id_of_user = this.user._id;
            this.router.navigateByUrl("/users/profiles/" + this.user._id)
          });  
      }
    } else {
      this.alert_error = "You are not authorized for this action";
    }
  }

  public is_logged_or_admin_user(): Boolean {
    return this.avtentikacijaStoritev.is_logged() ? this.avtentikacijaStoritev.get_current_user().is_admin || this.id_of_user == this.avtentikacijaStoritev.get_current_user()._id : false;
  }

  public change_name_of_profile_picture(event: any): void {
    this.user.profile_picture = null;
    this.profile_picture_file = event.target.files[0];
  }

  public id_of_user: String;
  public alert_error: String;
  public user: User;
  public profile_picture_file: any;


  ngOnInit(): void {
    this.id_of_user = this.pot.snapshot.paramMap.get('idUser');
    if (this.is_logged_or_admin_user()) {
      this.get_user_data(this.id_of_user);
    } else {
      this.router.navigateByUrl("/home");
    }
  }

}
