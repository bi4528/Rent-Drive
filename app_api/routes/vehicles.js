var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app_public/src/assets/uploads/');
        //cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        //cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
});

const ctrlVehicles = require('../controllers/vehicle');
const ctrlReviews = require('../controllers/review');



/* Vehicles */

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Vehicles
 *    description: Vehicle management
 *  - name: Reviews
 *    description: Review management
 */

router
/**
 * @swagger
 *  /vehicles/:
 *   get:
 *    summary: List of all vehicles
 *    tags: [Vehicles]
 *    responses:
 *     "200":
 *      description: Successful request with list of vehicles.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Vehicle"
 *     "500":
 *      description: Error on server side.
 */ .get('', ctrlVehicles.vehiclesAll);

router
/**
 * @swagger
 *  /vehicles/:
 *   post:
 *    summary: Add new vehicle
 *    description: Adds new vehicle with images, owner_id, make, model, typeoffuel, category, horsepower, maxspeed, acceleration, consumption, seats, doors, airconditioning, navigation, usb, aux, parkingsensors, autopilot, bluetooth, accessibility, description, price, country, city, address, zip, date, luggage, minage.
 *    tags: [Vehicles]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Vehicle data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Vehicle"
 *    responses:
 *     "201":
 *      description: Succesfully added new vehicle.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Vehicle"
 *     "400":
 *      description: Error while saving vehicle.
 *     "401":
 *      description: Authorization error, must be logged in to create vehicle.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error" 
 *        examples:
 *         Unauthorized:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *       description: Error on server side.
 */.post('', authentication, ctrlVehicles.vehiclesUpload);

 router
 /**
 * @swagger
 *  /imagesUpload/:
 *   post:
 *    summary: Uploads images
 *    tags: [Vehicles]
 *    security:
 *      - jwt: []
 *    requestBody:
 *     description: Image data
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error" 
 *        examples:
 *         No files found:
 *          $ref: "#/components/examples/ImageUploadError" 
 *    responses:
 *     "201":
 *      description: Succesfully added new images.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ArrayOfString'
 *     "401":
 *      description: Authorization error, must be logged in to create vehicle.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error" 
 *        examples:
 *         Unauthorized:
 *          $ref: "#/components/examples/NoToken" 
 *     "404":
 *      description: Image not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         No files found:
 *          $ref: "#/components/examples/ImageUploadError"  
 *     "500":
 *       description: Error on server side.
 */.post('/imagesUpload', authentication, upload.array('files'), ctrlVehicles.imagesUpload);

 router.
 /**
 * @swagger
 *  /vehicles/length:
 *   get:
 *    summary: Get number of vehicles in database
 *    tags: [Vehicles]
 *    responses:
 *     "200":
 *      description: Successfully got number.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/VehicleCount"
 *     "404":
 *      description: Number not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/examples/VehicleCountError"
 *     "500":
 *      description: Error on server side.
 */
 get('/length', ctrlVehicles.returnLength);

router.
/**
 * @swagger
 *  /vehicles/{idVehicle}:
 *   get:
 *    summary: Get data of vehicle
 *    tags: [Vehicles]
 *    parameters:
 *    - in: path 
 *      name: idVehicle
 *      required: true
 *      description: id of vehicle 
 *      schema:
 *       type: string
 *    responses:
 *     "200":
 *      description: Successful request, vehicle data was found and returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Vehicle"
 *     "404":
 *      description: Vehicle not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Vehicle not found:
 *          $ref: "#/components/examples/VehicleNotFound"
 *     "500":
 *      description: Error on server side.
 */
get('/:id', ctrlVehicles.vehiclesFind);

router.
/**
 * @swagger
 *  /{idVehicle}:
 *   put:
 *    summary: Update vehicle data
 *    description: Update data of vehicle with data of firstname, lastname, username, phone_number, email, location, password, profile_picture, favourite_vehicles_ids.
 *    tags: [Vehicles]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Data of vehicle
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Vehicle"
 *    parameters:
 *     - in: path
 *       name: idVehicle
 *       description: id of vehicle
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Updated and returned vehicle data.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Vehicle"
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Vehicle not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *     "500":
 *      description: Error on server side.
 */ 
put('/:id', authentication, ctrlVehicles.vehiclesUpdate);

router.
/**
 * @swagger
 *  /vehicles/{idVehicle}:
 *   delete:
 *    summary: Delete vehicle
 *    tags: [Vehicles]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idVehicle
 *       description: id of vehicle
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Successfully deleted vehicle.
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Vehicle not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Vehicle not found:
 *          $ref: "#/components/examples/VehicleNotFound"  
 *     "500":
 *      description: Server error while deleting vehicle.
 */delete('/:id', authentication, ctrlVehicles.vehiclesDelete);


/* Reviews */
router
/**
 * @swagger
 *  /vehicles/{id}/reviews:
 *   get:
 *    summary: Get all reviews of certain vehicle.
 *    tags: [Reviews]
 *    parameters:
 *    - in: path 
 *      name: id
 *      required: true
 *      description: id of vehicle 
 *      schema:
 *       type: string
 *    responses:
 *     "200":
 *      description: Successful request with list of all reviews.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Review"
 *     "404":
 *      description: Vehicle not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Vehicle not found:
 *          $ref: "#/components/examples/VehicleNotFound"
 *     "500":
 *      description: Error on server side.
 */ .get('/:id/reviews/', ctrlReviews.reviewsAll);

router
/**
 * @swagger
 *  /vehicles/{idVehicle}/reviews/:
 *   post:
 *    summary: Add review for vehicle
 *    tags: [Reviews]
 *    security:
 *     - jwt: []
 *    parameters:
 *    - in: path
 *      name: idVehicle
 *      required: true
 *      description: id of vehicle
 *      schema:
 *       type: string
 *    requestBody:
 *     description: Review details
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Review"
 *    responses:
 *     "201":
 *      description: Review added successfully.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Review"
 *     "401":
 *      description: No authorization.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Vehicle not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Vehicle not found:
 *          $ref: "#/components/examples/VehicleNotFound" 
 *     "500":
 *      description: Server error while saving review.
 */.post('/:id/reviews/', authentication, ctrlReviews.reviewsUpload);

router
/**
 * @swagger
 *  /vehicles/{idVehicle}/reviews/{idReview}:
 *   get:
 *    summary: Get data of vehicle
 *    tags: [Reviews]
 *    parameters:
 *    - in: path 
 *      name: idVehicle
 *      required: true
 *      description: id of vehicle 
 *      schema:
 *       type: string
 *    - in: path
 *      name: idReview
 *      required: true
 *      description: id of review 
 *      schema:
 *       type: string
 *    responses:
 *     "200":
 *      description: Successful request, review was found and returned.
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/Review"
 *     "404":
 *      description: Vehicle not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Vehicle not found:
 *          $ref: "#/components/examples/VehicleNotFound"
 *         Review not found:
 *          $ref: "#/components/examples/ReviewNotFound" 
 *     "500":
 *      description: Error on server side.
 */.get('/:idVehicle/reviews/:idReview', ctrlReviews.reviewsFind);

router
/** 
* @swagger
*  /vehicles/{idVehicle}/reviews/{idReview}:
*   delete:
*    summary: Delete review
*    tags: [Reviews]
*    security:
*     - jwt: []
*    parameters:
*     - in: path
*       name: idVehicle
*       required: true
*       description: id of vehicle
*       schema:
*        type: string
*     - in: path
*       name: idReview
*       required: true
*       description: id of review
*       schema:
*        type: string
*    responses:
*     "204":
*      description: Successfully deleted review.
*     "401":
*      description: Authentication error.
*      content:
*       application/json:
*        schema:
*         $ref: "#/components/schemas/Error"
*        examples:
*         no token:
*          $ref: "#/components/examples/NoToken"
*     "404":
*      description: Vehicle not found.
*      content:
*       application/json:
*        schema:
*         $ref: "#/components/schemas/Error"
*        examples:
*         Vehicle not found:
*          $ref: "#/components/examples/VehicleNotFound"
*         Review not found:
*          $ref: "#/components/examples/ReviewNotFound"
*         Reviews not found:
*          $ref: "#/components/examples/ReviewsNotFound"          
*     "500":
*      description: Server error while deleting vehicle.
*/.delete('/:idVehicle/reviews/:idReview', authentication, ctrlReviews.reviewsDelete);


module.exports = router;
