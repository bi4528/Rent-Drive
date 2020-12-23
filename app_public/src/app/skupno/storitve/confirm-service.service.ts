import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfirmServiceService {

  constructor() { }

  message: string;

  confirmMessage(message: string) {
    this.message = message;
  }
}
