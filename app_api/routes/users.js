var express = require('express');
var router = express.Router();

const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});
const authentication_recover_password = jwt({
    secret: process.env.JWT_PASSWORD_RECOVER,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app_public/src/assets/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
});


const ctrlUser = require("../controllers/user")

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Users
 *    description: User management
 *  - name: Recover password
 *    description: Reset and recover password functions
 *  - name: Authentication
 *    description: Login and check
 *  - name: Uploads
 *    description: Profile picture upload function 
 */

/**
 * Authentication scheme
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 */


router.route('/')
/**
 * @swagger
 *  /users/:
 *   get:
 *    summary: List of all users
 *    description: You get all users.
 *    tags: [Users]
 *    responses:
 *     "200":
 *      description: Successful request with list of users.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/User"
 *     "500":
 *      description: Error on server side.
 */
    .get(ctrlUser.get_all_users)
/**
 * @swagger
 *  /users/:
 *   post:
 *    summary: Add new user
 *    description: Add ** new user ** with data of firstname, lastname, username, phone_number, email, location, password, profile_picture, favourite_vehicles_ids.
 *    tags: [Users]
 *    requestBody:
 *     description: User data
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/UserRegister"
 *    responses:
 *     "201":
 *      description: Succesfully registered new user, token is returned.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/AuthenticationResponse"
 *     "400":
 *      description: Error while saving user.
 *     "409":
 *       description: User with same mail already exists.
 *     "500":
 *       description: Error on server side.
 */
    .post(ctrlUser.create_new_user);
router.route('/:idUser')
/**
 * @swagger
 *  /users/{idUser}:
 *   get:
 *    summary: Get data of user
 *    description: Get data of user with user id :idUser.
 *    tags: [Users]
 *    parameters:
 *    - in: path 
 *      name: idUser
 *      required: true
 *      description: id of user 
 *      schema:
 *       type: string
 *    responses:
 *     "200":
 *      description: Successful request, user data was updated and returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/User"
 *     "400":
 *      description: Error while saving user.
 *     "404":
 *        description: User with user id idUser was not found.
 *     "500":
 *      description: Error on server side.
 */
    .get(ctrlUser.get_user_data)
/**
 * @swagger
 *  /users/{idUser}:
 *   put:
 *    summary: Update user data
 *    description: Update ** data of user ** with data of firstname, lastname, username, phone_number, email, location, password, profile_picture, favourite_vehicles_ids.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Data of user
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/UserRegister"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: id of user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Updated and returned user data.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/User"
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
 *      description: User not found
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *     "500":
 *      description: Error on server side.
 */
    .put(authentication, ctrlUser.updated_profile_data)
/**
 * @swagger
 *  /users/{idUser}:
 *   delete:
 *    summary: Delete user
 *    description: Delete **user**.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: id of user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Successfully deleted user.
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
 *      description: Error while deleting user.
 */
    .delete(authentication, ctrlUser.remove_user);

/* /{idUser}/ */
router.route('/:idUser/favourite_vehicles')
/**
 * @swagger
 *  /users/{idUser}/favourite_vehicles:
 *   get:
 *    summary: Get favourite vehicles of user
 *    description: Get favourite vehicles of user with user id :idUser.
 *    tags: [Users]
 *    parameters:
 *    - in: path 
 *      name: idUser 
 *      description: id of user 
 *      schema:
 *       type: string 
 *      required: true
 *    responses:
 *     "200":
 *      description: Successful request, vehicles were returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Vehicle"
 *     "404":
 *        description: User with user id :idUser was not found.
 *     "500":
 *      description: Error on server side.
 */
    .get(ctrlUser.get_favourite_vehicles)
/**
 * @swagger
 *  /users/{idUser}/favourite_vehicles:
 *   post:
 *    summary: Like/Dislike vehicle
 *    description: Like or Dislike a vehicle le_picture, favourite_vehicles_ids.
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: id of vehicle
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/ToggleFavouriteVehicle"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: id of user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "201":
 *      description: Succesfully liked/disliked vehicle, user data was returned.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/User"
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
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         User not found:
 *          $ref: "#/components/examples/UserNotFound"
 *     "500":
 *      description: Error while saving user.
 */
    .post(authentication, ctrlUser.toggle_favourite_vehicle);

/**
 * @swagger
 *  /users/{idUser}/vehicles:
 *   get:
 *    summary: Get vehicles of user
 *    description: Get vehicles of user with user id idUser.
 *    tags: [Users]
 *    parameters:
 *    - in: path 
 *      name: idUser 
 *      description: id of user 
 *      schema:
 *       type: string 
 *      required: true
 *    responses:
 *     "200":
 *      description: Successful request, vehicles were returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Vehicle"
 *     "404":
 *        description: User with user id :idUser was not found.
 *     "500":
 *      description: Error on server side.
 */
router.route('/:idUser/vehicles').get(ctrlUser.get_vehicles_of_user);
/**
 * @swagger
 *  /users/{idUser}/rents:
 *   get:
 *    summary: Get rents of user
 *    description: Get rents of user with user id idUser.
 *    tags: [Users]
 *    parameters:
 *    - in: path
 *      name: idUser 
 *      description: id of user 
 *      schema:
 *       type: string 
 *      required: true
 *    responses:
 *     "200":
 *      description: Successful request, vehicles were returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/Rented"
 *     "401":
 *      description: No authorization.
 *      content:
 *       application / json:
 *        schema:
 *         $ref: "#/components/schemas/Error" 
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "404":
 *        description: User with user id :idUser was not found.
 *     "500":
 *      description: Error on server side.
 */
router.get('/:idUser/rents', authentication, ctrlUser.get_rents_of_user);

/* RECOVER PASSWORD */
/**
 * @swagger
 *  /users/forgotpassword/{emailUser}:
 *   get:
 *    summary: Send email for recovery of password
 *    description: User forgot password, send email to emailUser with token for recovery.
 *    tags: [Recover password]
 *    parameters:
 *    - in: path 
 *      name: emailUser 
 *      description: email of user 
 *      schema:
 *       type: string 
 *      required: true
 *    responses:
 *     "200":
 *      description: Successful request, email was sent, info data was returned.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/InformationDataOfSentEmail"
 *     "400":
 *      description: Email is not valid.
 *     "404":
 *       description: User with email emailUser was not found.
 *     "500":
 *      description: Error on server side.
 */
router.get('/forgotpassword/:email', ctrlUser.send_email_forgot_password);
/**
 * @swagger
 *  /users/recover_password/{idUser}:
 *   post:
 *    summary: Recover password
 *    description: Recover password of user with id idUser.
 *    tags: [Recover password]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: New password and email of user
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Login"
 *    parameters:
 *     - in: path
 *       name: idUser
 *       description: id of user
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "201":
 *      description: Password was reset.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/User"
 *     "400":
 *      description: Email or password are not valid.
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
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         User not found:
 *          $ref: "#/components/examples/UserNotFound"
 *     "500":
 *      description: Error while saving user.
 */
router.post('/recover_password/:idUser', authentication_recover_password, ctrlUser.reset_password);

/**
 * @swagger
 *  /users/check/exists_mail/{email}:
 *   get:
 *    summary: Check if exists user with email
 *    description: Check if exists user with email.
 *    tags: [Authentication]
 *    parameters:
 *    - in: path 
 *      name: email 
 *      description: email
 *      schema:
 *       type: string 
 *      required: true
 *    responses:
 *     "200":
 *      description: Successful request, boolean returned.
 *     "400":
 *      description: Email is not valid.
 *     "404":
 *       description: User with email emailUser was not found.
 *     "500":
 *      description: Error on server side.
 */
router.get('/check/exists_mail/:email', ctrlUser.check_if_mail_exists);

/**
 * @swagger
 *  /users/login:
 *   post:
 *    summary: User login
 *    description: User login.
 *    tags: [Authentication]
 *    requestBody:
 *     description: Password and email of user
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/Login"
 *    responses:
 *     "201":
 *      description: User is now logged.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/AuthenticationResponse"
 *     "400":
 *      description: Email or password are not valid.
 *     "401":
 *      description: No authorization.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken"
 *     "500":
 *      description: Error while saving user.
 */
router.post('/login', ctrlUser.login);

/**
 * @swagger
 *  /users/upload/profile_picture:
 *   post:
 *    summary: Upload profile picture
 *    description: Upload ** profile picture ** of user.
 *    tags: [Uploads]
 *    security:
 *     - jwt: []
 *    responses:
 *     "201":
 *      description: Image was uploaded, filename was returned.
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
 *      description: Image not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         Image not found:
 *          $ref: "#/components/examples/ImageNotFound"
 */
router.post('/upload/profile_picture', authentication, upload.single('profile_picture'), ctrlUser.upload_profile_picture);

module.exports = router;
