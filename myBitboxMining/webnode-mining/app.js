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
var ResourceHelper = require('./global/ResourceHelper');

var app = express();

app.locals.showMessage = ResourceHelper.showMessage;
app.locals.showAdminMessage = ResourceHelper.showAdminMessage;

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
const wallet = require('./routes/customer/wallet');
const history = require('./routes/customer/history');
const adminProduct = require('./routes/admin/product');
const maintenanceFee = require('./routes/customer/maintenanceFee');
const withdraweth = require('./routes/customer/withdraw_eth');

// router api
const productApi = require('./routes/customerApi/productApi');
const walletApi = require('./routes/customerApi/walletApi');
const orderApi = require('./routes/customerApi/orderApi');
const customerHistoryApi = require('./routes/customerApi/historyApi');
const adminProductApi = require('./routes/adminApi/productApi');
const maintenanceFeeApi = require('./routes/customerApi/maintenanceFeeApi');
// router user
const adminAccountRoute = require('./routes/admin/account');

// use router of customer
app.use('/', indexRouter);
app.use('/', customerAccountRoute);
app.use('/', calculation);
app.use('/', product);
app.use('/', orders);
app.use('/', wallet);
app.use('/', withdraweth);
app.use('/', history);
app.use('/', adminProduct);
app.use('/', maintenanceFee);
app.use('/api-v1/products/', productApi);
app.use('/api-v1/wallets/', walletApi);
app.use('/api-v1/orders/', orderApi);
app.use('/api-v1/maintenances/', maintenanceFeeApi);
app.use('/api-v1/customerhistories/', customerHistoryApi);
app.use('/api-v1/admin/products/', adminProductApi);

app.use('/', adminAccountRoute);

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


// execute jobs
const JobUpdateBalance = require('./jobs/updateWalletBalance');
JobUpdateBalance.execute();

const MaintenanceFeeJob = require('./jobs/calculationMaintainFee');
MaintenanceFeeJob.execute();

module.exports = app;
