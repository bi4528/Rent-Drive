const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       description: Review data
 *       properties:
 *         _id:
 *            type: string
 *            format: uuid
 *            example: 5ded18eb51386c3799833191
 *         username:
 *            type: string
 *            example: joshsmith213
 *         rating:
 *            type: string
 *            example: ★★★☆☆
 *         comment:
 *            type: string
 *            example: Very nice car
 *         img:
 *            type: string
 *            example: profilepicture.jpg
 *         user_id:
 *            type: string
 *            format: uuid
 *            example: 5fe5fbb81f46e923281fe122
 *       required:
 *         - username
 *         - rating
 *         - comment
 *         - img
 *         - user_id
*/

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: String,
    username: String,
    user_id: String,
    img: String
});


/**
 * @swagger
 * components:
 *  schemas:
 *   Vehicle:
 *    type: object
 *    description: Vehicle data
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5fe8902647fa2a179c83233a 
 *     images:
 *      type: array
 *      description: array of vehicle images
 *      items:  
 *        type: string
 *        example: ["tesla1.jpg","tesla2.jpg","tesla3.jpg","tesla4.jpg","tesla5.jpg","tesla6.jpg"]
 *     owner_id:
 *        type: string
 *        description: Unique ID of owner 
 *        format: uuid
 *        example: 5fe5fbb81f46e923281fe125
 *     make:
 *        type: string
 *        description: Vehicle make
 *        example: Subaru
 *     model:
 *        type: string
 *        description: Vehicle make
 *        example: Impreza WRX STI
 *     typeoffuel:
 *        type: string
 *        description: Vehicle fuel
 *        example: Petrol
 *     category:
 *        type: string
 *        description: Vehicle category
 *        example: Hatchback
 *     hp:
 *        type: number
 *        description: Vehicle horsepower
 *        example: 208
 *     maxspeed:
 *        type: number
 *        description: Maximum speed of vehicle in kilometers per hour.
 *        example: 270
 *     acceleration:
 *         type: number
 *         description: Time (seconds) necessary to accelerate from 0 to 60 km/h.
 *         example: 3,8
 *     consumption:
 *         type: number
 *         description: Average fuel consumption (liters) per 100 km
 *         example: 9,1
 *     seats:
 *         type: number
 *         description: Number of seats in the car
 *         example: 4
 *     doors:
 *         type: number
 *         description: Number of doors in the car
 *         example: 4
 *     AirConditioning:
 *         type: string
 *         description: The car contains/doesn't contain a functioning A/C 
 *         example: on
 *     Navigation:
 *         type: string
 *         description: The car contains/doesn't contain a navigational system 
 *         example: on
 *     USB:
 *         type: string
 *         description: The car contains/doesn't contain USB ports 
 *         example: off
 *     AUX:
 *         type: string
 *         description: The car contains/doesn't contain AUX support 
 *         example: on
 *     parkingsensor:
 *         type: string
 *         description: The car contains/doesn't contain parking sensors
 *         example: off
 *     autopilot:
 *         type: string
 *         description: The car contains/doesn't contain a functioning A/C 
 *         example: on
 *     bluetooth:
 *         type: string
 *         description: The car contains/doesn't contain bluetooth support 
 *         example: off
 *     accessibility:
 *         type: string
 *         description: The car is accessible 
 *         example: off
 *     description:
 *         type: string
 *         description: A short description of the car by the owner
 *         example: Inspired by Subaru's factory-backed FIA World Championship Rally series race cars and tuned for maximum performance, the 2021 Subaru WRX STI will overwhelm the faint of heart. In fact, the STI's turbocharged flat-four cylinder engine and firm suspension can startle even ardent driving enthusiasts.        
 *     price:
 *         type: number
 *         description: Daily rental price of the car in € 
 *         example: 70
 *     country:
 *         type: string
 *         description: Country where the car is situated
 *         example: Slovenia
 *     city:
 *         type: string
 *         description: City where the car is situated
 *         example: Murska Sobota
 *     addres:
 *         type: string
 *         description: Address where the car is situated
 *         example: Vrazova ulica 10
 *     zip:
 *         type: number
 *         description: ZIP code of car location
 *         example: 9000
 *     date:
 *         type: array
 *         description: Beginning and end of rental period
 *         items:  
 *           type: string
 *           example: ["2020-12-20","2021-01-24"]
 *     reviews:
 *         type: array
 *         description: All known reviews of vehicle 
 *         items:
 *           type: object
 *           $ref: "#/components/schemas/Review" 
 *             
 *     luggage:
 *         type: number
 *         description: Luggage space capacity of trunk in liters
 *         example: 460
 *     minage:
 *         type: number
 *         description: Minimum age required to drive this vehicle (requested by the owner or the authorities)
 *         example: 21     
 *    required:
 *      - owner_id
 *      - make
 *      - model
 *      - typeoffuel
 *      - category
 *      - hp
 *      - maxspeed
 *      - acceleration
 *      - consumption
 *      - seats
 *      - doors
 *      - description
 *      - price
 *      - country
 *      - city
 *      - addres
 *      - zip
 *      - date
 *      - luggage
 *      - minage
 *   VehicleCount:
 *    type: object
 *    description: Vehicle count
 *    properties:
 *     number_vehicles:
 *      type: number               
 */

const vehicleSchema = new mongoose.Schema({
    images: [String],
    owner_id: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    typeoffuel: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    maxspeed: {
        type: Number,
        required: true
    },
    acceleration: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    AirConditioning: String,
    Navigation: String,
    USB: String,
    AUX: String,
    parkingsensors: String,
    autopilot: String,
    bluetooth: String,
    accessibility: String,
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    addres: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    date: {
        type: [String],
        required: true
    },
    reviews: [reviewSchema],
    luggage: {
        type: Number,
        required: true
    },
    minage: {
        type: Number,
        required: true
    }
});

/**
 * @swagger
 *  components:
 *   examples:
 *    VehicleNotFound:
 *     value:
 *      message: Ne najdem avta s podanim enoličnim identifikatorjem id.
 *    ReviewNotFound:
 *     value:
 *      message: Ne najdem komentarja s podanim enoličnim identifikatorjem idReview. 
 *    VehicleCountError:
 *     value:
 *      message: Zgodila se je napaka pri dobivanje st avtov
 *    ImageUploadError:
 *     value:
 *      message: No file found
 *    ReviewsNotFound:
 *     value:
 *      message: Ni komentarja za brisanje.
 * 
 */

mongoose.model('Vehicle', vehicleSchema, 'Vehicles');
mongoose.model('Review', reviewSchema, 'Reviews');
