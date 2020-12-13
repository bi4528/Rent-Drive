export class Review {
    _id: string;
    comment: string;
    rating: string;
    username: string;
    user_id: string;
    img: string;
}

export class Vehicle {
    _id: string;
    images: string[];
    owner_id: string;
    make: string;
    model: string;
    typeoffuel: string;
    category: string;   
    hp: number;
    maxspeed: number;    
    acceleration: number;
    consumption: number;
    seats: number;
    doors: number;
    AirConditioning: string;
    Navigation: string;
    USB: string;
    AUX: string;
    parkingsensors: string;
    autopilot: string;
    bluetooth: string;
    accessibility: string;
    description: string;
    price: number;
    country: string;
    city: string;
    addres: string;
    zip: number;
    date: string[];
    reviews: Review[];
    luggage: number;
    minage: number;
}
