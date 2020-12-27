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

/**
 * Authentication scheme
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

router
/**
 * @swagger
 *  /vehicles/:
 *   get:
 *    summary: List of all vehicles
 *    description: You get all vehicles.
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
 *    description: Adds ** new vehicle ** with images, owner_id, make, model, typeoffuel, category, horsepower, maxspeed, acceleration, consumption, seats, doors, airconditioning, navigation, usb, aux, parkingsensors, autopilot, bluetooth, accessibility, description, price, country, city, address, zip, date, luggage, minage.
 *    tags: [Vehicles]
 *    requestBody:
 *     description: Vehicle data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/UserRegister"
 *    responses:
 *     "201":
 *      description: Succesfully added new vehicle.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/AuthenticationResponse"
 *     "400":
 *      description: Error while saving vehicle.
 *     "409":
 *       description: Vehicle with same data already exists.
 *     "500":
 *       description: Error on server side.
 */.post('', authentication, ctrlVehicles.vehiclesUpload);

 router.post('/imagesUpload', authentication, upload.array('files'), ctrlVehicles.imagesUpload);

 router.
 /**
 * @swagger
 *  /length:
 *   get:
 *    summary: Get number of vehicles in database
 *    description: Counts vehicles in database.
 *    tags: [Vehicles]
 *    responses:
 *     "200":
 *      description: Successful request, vehicle count was returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: number
 *     "404":
 *        description: No vehicles found.
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
 *    description: Gets data of vehicle with vehicle id :idVehicle.
 *    tags: [Vehicles]
 *    parameters:
 *    - in: path 
 *      name: idVehicle 
 *      description: id of vehicle 
 *      schema:
 *       type: string 
 *       required: true
 *    responses:
 *     "200":
 *      description: Successful request, vehicle data was and returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Vehicle"
 *     "400":
 *      description: Error while saving vehicle.
 *     "404":
 *        description: Vehicle with vehicle id idVehicle was not found.
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
 *    description: Update ** data of vehicle ** with data of firstname, lastname, username, phone_number, email, location, password, profile_picture, favourite_vehicles_ids.
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
 *    description: Deletes a **vehicle**.
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
 *    description: You get all reviews belonging to vehicle of vehicleId.
 *    tags: [Vehicles]
 *    parameters:
 *    - in: path 
 *      name: id 
 *      description: id of vehicle 
 *      schema:
 *       type: string 
 *       required: true
 *    responses:
 *     "200":
 *      description: Successful request with list of all reviews.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Review"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *      description: Car with given id not found.
 *     "500":
 *      description: Error on server side.
 */ .get('/:id/reviews/', ctrlReviews.reviewsAll);

router.post('/:id/reviews/', authentication, ctrlReviews.reviewsUpload);
router.get('/:idVehicle/reviews/:idReview', ctrlReviews.reviewsFind);
router.delete('/:idVehicle/reviews/:idReview', authentication, ctrlReviews.reviewsDelete);


module.exports = router;
