import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../razredi/user';
import { Vehicle } from '../razredi/vehicle';
import { Rent } from '../razredi/rent';
import { AuthenticationResult } from '../razredi/authentication-result';
import { Storage_Browser } from '../razredi/storage';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    constructor() { }

    public email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public password_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    public make_regex = /\b[a-z]+\b/i;
    public word_regex = /\b[a-z || A-Z]+\b/;
    public phone_regex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
    public no_spaces = /^\S*$/;
    public usernameRx = /^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    public validate_user(user:User): Boolean {
        return this.validate_first_name(user.firstname) &&
            this.validate_last_name(user.lastname) &&
            this.validate_username(user.username) &&
            this.validate_email(user.email) &&
            this.validate_password(user.password) &&
            (user.location == null || user.location=="" || this.validate_location(user.location)) &&
            (user.phone_number == null || user.phone_number=="" || this.validate_phone_number(user.phone_number));
    }


    public validate_first_name(name): Boolean {
        return this.validate_not_empty_string(name) && this.validate_word(name);
    }

    public validate_username(name): Boolean {
        return this.validate_not_empty_string(name) && this.usernameRx.test(name);
    }

    public validate_phone_number(number): Boolean {
        return this.validate_not_empty_string(number) && this.phone_regex.test(number);
    }


    public validate_last_name(name): Boolean {
        return this.validate_not_empty_string(name) && this.validate_word(name);
    }


    public validate_word(name): Boolean {
        return name != null && this.word_regex.test(name);
    }


    public validate_not_empty_string(name): Boolean {
        return name != null && name.length > 0;
    }

    public validate_location(location): Boolean {
        return this.validate_not_empty_string(location);
    }

    public validate_email(email): Boolean {
        return this.validate_not_empty_string(email) && this.email_regex.test(email.toLowerCase())
    }

    public validate_phone_number2(number) : Boolean {
        return this.validate_not_empty_string(number) && this.phone_regex.test(number);
    }
    
    /*
    (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9])	The string must contain at least 1 numeric character
    (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
    (?=.{8,})	The string must be eight characters or longer
    */
    public validate_vehicle_speed(speed) {
        return parseFloat(speed) > 0;
    }
    
    public validate_vehicle_number_of_doors(number_of_doors) {
        return parseInt(number_of_doors) > 0 && /\b[0-9]+\b/.test(number_of_doors);
    }
    
    public validate_vehicle_age(age) {
        return age >= 0;
    }
    
    public validate_vehicle_luggage(l) {
        return parseFloat(l) >= 0;
    }
    public validate_vehicle_horespower(hp) {
        return /\b[0-9]+\b/.test(hp) && parseFloat(hp) > 0;
    }
    public validate_acceleration(time) {
        return /\b([0-9]+.[0-9]+|[0-9]+,[0-9]+|[0-9]+)\b/.test(time);
    }
    public validate_vehicle_doors_seats(speed) {
        return parseInt(speed) > 0 && parseInt(speed) < 7 && /\b[0-9]+\b/.test(speed);
    }
    public validate_vehicle_price_per_day(price) {
        return parseFloat(price) > 0 && parseFloat(price) < 5000;
    }
    public validate_phone(phone) {
        return /\b[0-9]+\b/.test(phone);
    }
    public validate_dates(date1, date2) {
        let date1s = new Date(date1);
        let date2s = new Date(date2);
        return date2s >= date1s;
    }
    public validate_no_spaces(word) {
        return this.no_spaces.test(word);
    }
    public validate_city(city) {
        return this.validate_not_empty_string(city) && /\b([a-z]+|[a-z]+-[a-z]+)\b/i.test(city);
    }

    public validate_password(password): Boolean {
        return this.validate_not_empty_string(password) && this.password_regex.test(password);
    }

    public validate_vehicle_make(make): Boolean {
        return this.make_regex.test(make);
    }


}
