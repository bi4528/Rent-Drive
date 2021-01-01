const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    description: Data of user for login
 *    properties:
 *     email:
 *      type: string
 *      description: email address
 *      example: dejan@lavbic.net
 *     password:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - email
 *     - password
 *   UserRegister:
 *    type: object
 *    description: Data of user for registration
 *    properties:
 *     firstname:
 *      type: string
 *      example: Dejan
 *     lastname:
 *      type: string
 *      example: Lavbič
 *     username:
 *      type: string
 *      example: Dejan77
 *     phone_number:
 *      type: string
 *      example: 3478198834
 *     email:
 *      type: string
 *      description: email address
 *      example: dejan@lavbic.net
 *     location:
 *      type: string
 *      description: location of user
 *      example: Ljubljana
 *     profile_picture:
 *      type: string
 *      description: filename of profile picture
 *      example: banana.jpg
 *     favourite_vehicles_ids:
 *      type: array
 *      items:
 *          $ref: "#/components/schemas/Vehicle"
 *      description: ids of favourite vehicles
 *      example: []
 *     password:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - firstname
 *     - lastname
 *     - username
 *     - email
 *     - password
 *   User:
 *    type: object
 *    description: User data
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: id
 *      example: 5ded18eb51386c3799833191
 *     firstname:
 *      type: string
 *      example: Dejan
 *     lastname:
 *      type: string
 *      example: Lavbič
 *     username:
 *      type: string
 *      example: Dejan77
 *     phone_number:
 *      type: string
 *      example: 3478198834
 *     email:
 *      type: string
 *      description: email address
 *      example: dejan@lavbic.net
 *     location:
 *      type: string
 *      description: location of user
 *      example: Ljubljana
 *     profile_picture:
 *      type: string
 *      description: filename of profile picture
 *      example: banana.jpg
 *     favourite_vehicles_ids:
 *      type: array
 *      items:
 *          $ref: "#/components/schemas/Vehicle"
 *      description: ids of favourite vehicles
 *      example: []
 *     consendedValue:
 *      type: string
 *      example: testalnckenlfknaefnanefaenfpefnaeòf
 *     randomValue:
 *      type: string
 *      example: testsjabedifneafdalebnfladeifni
 *     is_admin:
 *      type: boolean
 *      example: false
 *    required:
 *     - firstname
 *     - lastname
 *     - username
 *     - email
 *     - consendedValue
 *     - randomValue
 *     - is_admin
 *   ToggleFavouriteVehicle:
 *    type: object
 *    description: Like or Dislike vehicle
 *    properties:
 *     favourite_vehicles_id:
 *      type: string
 *      example: afhapejfpancanconwcpoqancpocqno
 *    required:
 *     - favourite_vehicles_id
 *   AuthenticationResponse:
 *    type: object
 *    description: Result of successful authentication of user
 *    properties:
 *     token:
 *      type: string
 *      description: JWT token
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - token
 *   Error:
 *    type: object
 *    description: Error details
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: Paramateres are incorrect.
 *   InformationDataOfSentEmail:
 *    type: object
 *    description: Information of sent email
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: TODO.
 * 
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    consendedValue: {
        type: String,
        required: true
    },
    randomValue: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    location: {
        type: String
    },
    favourite_vehicles_ids: {
        type: [String]
    },
    is_admin: {
        type: Boolean,
        required: true
    }
});

userSchema.methods.setPassword = function (geslo) {
    this.randomValue = crypto.randomBytes(16).toString('hex');
    this.consendedValue = crypto
        .pbkdf2Sync(geslo, this.randomValue, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.checkPassword = function (geslo) {
    let zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.randomValue, 1000, 64, 'sha512')
        .toString('hex');
    return this.consendedValue == zgoscenaVrednost;
};

userSchema.methods.generateJwt = function () {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7); //tle bi lahko spremenili da seja potece hitreje nego kot 7 dni

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        is_admin: this.is_admin,
        exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_PASSWORD);
};

/**
 * @swagger
 *  components:
 *   examples:
 *    UserNotFound:
 *     summary: User not found
 *     value:
 *      message: User not found.
 *    NoToken:
 *     summary: no JWT token.
 *     value:
 *      message: "UnauthorizedError: No authorization token was found."
 *    EmailNotValid:
 *     summary: Email is not valid.
 *     value:
 *      message: Email is not valid.
 *    ImageNotFound:
 *     summary: Image is not found.
 *     value:
 *      message: Image is not found.
 *    ErrorUserNotFound:
 *     summary: User not found.
 *     value:
 *      message: "User not found."
 *    ErrorVehicleNotFound:
 *     summary: Vehicle not found.
 *     value:
 *      message: "Vehicle not found."
 *    ErrorDates:
 *     summary: Dates evaluated to a falsy values.
 *     value:
 *      message: "Dates evaluated to a falsy values."
 *    ErrorDateFrom:
 *     summary: Date_from evaluated to a falsy value.
 *     value:
 *      message: "Date_from evaluated to a falsy value."
 *    ErrorDateTo:
 *     summary: Date_to evaluated to a falsy value.
 *     value:
 *      message: "Date_to evaluated to a falsy value."
 *    ErrorBadTime:
 *     summary: Bad time period selected.
 *     value:
 *      message: "Bad time period selected!"
 */


mongoose.model('User', userSchema, 'Users');
