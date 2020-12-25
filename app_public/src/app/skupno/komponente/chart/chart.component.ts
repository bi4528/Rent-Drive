import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {BookServiceService} from "../../storitve/book-service.service";
import {UsersDataService} from "../../storitve/users-data.service";
import {Vehicle} from "../../razredi/vehicle";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public condition: boolean = false;
  private userId: string;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Rating' },
    { data: [], label: 'Maximal Speed Rate' }
  ];

  constructor(private userService: UsersDataService, private pot: ActivatedRoute) { }

  public vehicles: Vehicle [];

  public getVehicles() :void{

      this.userService
        .getVehiclesOfUser(this.userId)
        .then((veh: Vehicle[]) => {
            this.vehicles = veh;
            this.createLables();
            this.condition = true;
          }
        )
        .catch((resp: any) => {
          console.log(resp);
        })

      console.log(this.vehicles);

  }

  public createLables() : void{
    console.log(this.vehicles);
    this.vehicles.forEach((value) =>{
      //console.log(value.make);

      var sum = 0;
      var avgRating:number = 0;
      for (var i = 0; i < value.reviews.length; i++)
        sum += value.reviews[i].rating.match(/★/g).length;
      if (sum > 0) {
          avgRating = sum / value.reviews.length;
          avgRating.toPrecision(2);
      }
      var speedRate;
      speedRate = (value.maxspeed/60).toPrecision(2);
      this.barChartLabels.push(value.make + " " +value.model);
      this.barChartData[0].data.push(avgRating);
      this.barChartData[1].data.push(speedRate);
    })
  }

  ngOnInit(): void {
    this.userId = this.pot.snapshot.paramMap.get('idUser');
    this.getVehicles();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

}
