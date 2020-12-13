var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var vehiclesRouter = require('./app_server/routes/vehicles');

require('./app_api/models/db');
var usersApi = require('./app_api/routes/users');
var vehicleApi = require('./app_api/routes/vehicles');
var rentedApi = require('./app_api/routes/rented');

var app = express();

// Session
var session = require('express-session');

console.log("Welcome to PHD MATEJ KALC'S SESSION");


// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'hbs');

//To je marko dodal
require('./app_server/views/helpers/hbsh.js');
require('./app_server/views/helpers/commenthelper.js');
require('./app_server/views/helpers/stars.js');
require('./app_server/views/helpers/featurehelper.js');
require('./app_server/views/helpers/featurehelper2.js');
require('./app_server/views/helpers/ifEquals.js');
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);

app.use('/api/users', usersApi);
app.use('/api/vehicles', vehicleApi);
app.use('/api/rented', rentedApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
