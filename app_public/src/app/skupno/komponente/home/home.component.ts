import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Vehicle, Review } from '../../razredi/vehicle';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../storitve/validation.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( 
    private vehiclesDataService: VehiclesDataService,
    private router: Router,
    private validationService: ValidationService,
    private el: ElementRef,
    private renderer: Renderer2,
    )
  { }

  public cars: Vehicle[];
  public sporocilo: string;

  public category: string;
  public dateFrom: string;
  public dateTo: string;
  public city: string;
  public validation_error: string;

  public filter = () : void => {
    this.validation_error="";
    let writeError=false;
    if (!this.city || !this.dateFrom || !this.dateTo || !this.validationService.validate_city(this.city)){
      this.validation_error = this.validation_error.concat("No blanks should be left and city should only have letters.\n");
      writeError = true;
    }
    if ( !this.validationService.validate_dates(this.dateFrom, this.dateTo)){
      this.validation_error = this.validation_error.concat("Date from must be before date to, or can you travel trough time?.\n");
      writeError = true;
    }

    if(writeError){
      this.openModal();
    }
    else {
      this.router.navigate(['/search'], {queryParams: {city: this.city, dateFrom: this.dateFrom, dateTo: this.dateTo, page: "1"} });
    }
  }

  private getVehicles = () : void => {
    this.sporocilo = "Searching for cars";
    this.vehiclesDataService
      .getVehicles('')
      .then( data => {
        this.sporocilo = data.length > 0 ? "" : "No cars found";
        this.cars = data;
      });
  }

  private clickListeners: Array<(evt: MouseEvent) => void> = [];
  ngAfterViewInit() {
    const anchorNodes: NodeList = this.el.nativeElement.querySelectorAll('a[href]:not(.LinkRef)'); // or a.LinkPage
    const anchors: Node[] = Array.from(anchorNodes);

    for (const anchor of anchors) {
      // Prevent losing the state and reloading the app by overriding the click event
      const listener = this.renderer.listen(anchor, 'click', (evt: MouseEvent) => this.onLinkClicked(evt));
      this.clickListeners.push(listener);
    }
  }

  private onLinkClicked(evt) {
    evt.preventDefault();
    if (evt.srcElement) {
      const href = evt.srcElement.getAttribute('href');
      if (href) {
        this.router.navigateByUrl(href);
      }
    }
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}
