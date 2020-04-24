var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileUpload=require('express-fileupload');
var nodemailer = require('nodemailer');
var flash = require('connect-flash');
const sequelize=require('sequelize');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({ cookie: { maxAge: 10 * 60 * 1000 }, 
  secret: 'delivery',
  resave: false, 
  saveUninitialized: false})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('./routes/index')(app);
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
http.listen(4600, () => console.log('app listening on port 4600!'));
