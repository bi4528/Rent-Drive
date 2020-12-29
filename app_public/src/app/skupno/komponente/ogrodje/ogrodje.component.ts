import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../storitve/avtentikacija.service'
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private povezavaStoritev: PovezavaService) { }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }


  public user_id: string;

  public is_user_logged(): boolean {
    return this.authenticationService.is_logged();
  }

  public get_user_id(): string {
    return this.authenticationService.get_current_user()._id;
  }
  ngOnInit(): void {
    if (this.is_user_logged()) {
      this.user_id = this.authenticationService.get_current_user()._id;
    }
  }

}
