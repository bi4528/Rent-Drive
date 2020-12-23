import { Component, OnInit } from '@angular/core';
import {User} from "../../razredi/user";
import {Rent} from "../../razredi/rent";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmServiceService} from "../../storitve/confirm-service.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private router: Router, private pot: ActivatedRoute, private confirmService: ConfirmServiceService){}

  public rent: Rent;
  public alert_error: String;
  public message: String;

  public back_to_homepage = (): void => {
    this.alert_error = "";
    this.router.navigateByUrl("/");
  }

  ngOnInit(): void {
    //this.message = "Još nije upisano u bazu!"
    this.message = this.confirmService.message;
  }

}
