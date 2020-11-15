var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var vehiclesRouter = require('./app_server/routes/vehicles');
var accountRouter = require('./app_server/routes/accounts')
var reviewRouter = require('./app_server/routes/reviews')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'hbs');

//To je marko dodal
require('./app_server/views/helpers/hbsh.js');
require('./app_server/views/helpers/commenthelper.js');
require('./app_server/views/helpers/stars.js');
//app.post('/', indexRouter);
const multer = require("multer");
const upload = multer({
    dest: "./public/images/"
});
//app.post('/', upload.single('image') ,indexRouter);
//

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/account', accountRouter);
app.use('/review', reviewRouter);

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
