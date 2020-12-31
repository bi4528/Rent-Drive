var express = require('express');
var router = express.Router();
const ctrlRented = require('../controllers/rented');

const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});

/* Rented */
/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Rented
 *    description: Rented management
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   Rented:
 *    type: object
 *    properties:
 *     user_id:
 *      type: string
 *      example: 5ded18eb51386c3799833191
 *     vehicle_id:
 *      type: string
 *      example: 5fe8902647fa2a179c83233a
 *     date_from:
 *      type: string
 *      example: "2020-12-20"
 *     date_to:
 *      type: string
 *      example: "2020-12-21"
 *    required:
 *     - user_id
 *     - vehicle_id
 *     - date_from
 *     - date_to
 *   ErrorAlreadyBooked:
 *    type: object
 *    description: Error details
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: Car has already been booked!
 */

router
/**
 * @swagger
 *  /rented:
 *   post:
 *    summary: Add new rent
 *    description: Booking **new car** with id of renter (user_id), id of vehicle (vehicle_id), date_from and date_to.
 *    tags: [Rented]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Data about rent
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Rented"
 *    responses:
 *     "201":
 *      description: Rent has been added successfully.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Rented"
 *     "409":
 *      description: Conflict.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorAlreadyBooked"
 *     "401":
 *      description: Unauthorized.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorAlreadyBooked"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 */
.post('/', ctrlRented.create_rented);

router
/**
 * @swagger
 *  /rented/:
 *   get:
 *    summary: List of all rents
 *    tags: [Rented]
 *    responses:
 *     "200":
 *      description: Successful request with list of rents.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Rented"
 *     "500":
 *      description: Error on server side.
 */
.get('/', ctrlRented.get_all_rented);

router
/**
 * @swagger
 *  /rented/today:
 *   get:
 *    summary: List of all rents which are rented today
 *    tags: [Rented]
 *    responses:
 *     "200":
 *      description: Successful request with list of rents.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Rented"
 *     "500":
 *      description: Error on server side.
 */
.get('/today', ctrlRented.get_all_rented_today);
router
/**
 * @swagger
 *  /rented/today-expired:
 *   get:
 *    summary: List of all rents which expire today
 *    tags: [Rented]
 *    responses:
 *     "200":
 *      description: Successful request with list of rents.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Rented"
 *     "500":
 *      description: Error on server side.
 */
.get('/today-expired', ctrlRented.get_all_expired_rents_today);
router
/**
 * @swagger
 *  /rented/{idRented}:
 *   delete:
 *    summary: Delete rent
 *    description: Delete **rent**.
 *    tags: [Rented]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idRented
 *       description: id of rent
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Successfully deleted rent.
 *     "401":
 *      description: Authentication error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorAlreadyBooked"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *      description: Error while deleting user.
 */
    .delete('/:idRented', ctrlRented.remove_rented);

module.exports = router;
