var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express");
var csrf = require('csurf');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var paypal = require('paypal-rest-sdk');

var app = express();

// config paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASLnhIT9I40_D0Qi1XcnV0vPqdmzytHF2lO5Gd3TIQTfbdweddTJ6NVmhIvQUM6ZXo7C1vcDfg00idZP',
    'client_secret': 'EMlUXVwhKm6rwtlc6-3JdLdqxoWJAFVKqgFK_KIJxj7XlW_dUi6SR19LlYXVQVFG6pH40Pd_OkeIhuLs'
});
app.locals.paypal = paypal;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 1000 * 60 * 30
    },
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// router customer
const indexRouter = require('./routes/customer/index');
const customerAccountRoute = require('./routes/customer/account');
const calculation = require('./routes/customer/calculation');
const product = require('./routes/customer/product');
const orders = require('./routes/customer/orders');
// router api
const productApi = require('./routes/customerApi/products');
// router user
const adminAccountRoute = require('./routes/admin/account');
// use router of customer
app.use('/', indexRouter);
app.use('/', customerAccountRoute);
app.use('/', calculation);
app.use('/', product);
app.use('/', orders);
app.use('/', adminAccountRoute);
app.use('/api-v1/products/', productApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

passport.use(new LocalStrategy(
    async function (username, password, done) {
        // var userMgr = new userManager(app.locals._db);
        // var user = await userMgr.getUserByEmailAndPassword(username, password);
        // if (user !== null) {
        //   return done(null, user);
        // }
        // else {
        //   return done(null, false, {message: 'Incorrect password.'})
        // }
    }
));

passport.serializeUser(function (user, done) {
    //done(null, user.getUserId());
});

passport.deserializeUser(async function (id, done) {
    // var userMgr = new userManager(app.locals._db);
    // var user = await userMgr.getUserById(id);
    // if (user !== null) {
    //   return done(null, user.getUserId());
    // }
    // else {
    //   return done(null, false, {message: 'Incorrect password.'})
    // }
});

module.exports = app;
