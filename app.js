require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "RentDrive",
      version: "1.0.0",
      description: "RentDrive REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    contact: {
      name: "Skupina01-SP,FRI",
      email: "skupina01.sp@gmail.com"
    },
    servers: [{
        url: "http://localhost:3000/api"
      },
      {
        url: "https://rentdrive-sp.herokuapp.com/api"
      }
    ]
  },
  apis: [
    "./app_api/models/user.js",
    "./app_api/models/rented.js",
    "./app_api/routes/vehicle.js",
    "./app_api/routes/nearby.js"
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

//var indexRouter = require('./app_server/routes/index');
//var usersRouter = require('./app_server/routes/users');
//var vehiclesRouter = require('./app_server/routes/vehicles');
var nearbyRouter = require('./app_api/routes/nearby');

require('./app_api/models/db');
require('./app_api/configuration/passport');
var usersApi = require('./app_api/routes/users');
var vehicleApi = require('./app_api/routes/vehicles');
var rentedApi = require('./app_api/routes/rented');
var nearbyApi = require('./app_api/routes/nearby');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'hbs');

require('./app_server/views/helpers/hbsh.js');
require('./app_server/views/helpers/commenthelper.js');
require('./app_server/views/helpers/stars.js');
require('./app_server/views/helpers/featurehelper.js');
require('./app_server/views/helpers/featurehelper2.js');
require('./app_server/views/helpers/ifEquals.js');

// Odprava varnostnih pomanjkljivosti
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/vehicles', vehiclesRouter);
//app.use('/nearby', nearbyRouter);

app.use('/api/users', usersApi); // /api/docs
app.use('/api/vehicles', vehicleApi);
app.use('/api/rented', rentedApi);
app.use('/api/nearby', nearbyApi);

//NAJ KDO POPRAVI SPODNJO FUNKCIJO NEVEM KAJ DELA by Matej
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

usersApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
usersApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

vehicleApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
vehicleApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

rentedApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
rentedApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({
      "message": err.name + ": " + err.message
    });
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
