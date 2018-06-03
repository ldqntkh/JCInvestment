var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express");
var csrf = require('csurf');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var userObject = require('./models/User');
var userManager = require('./modelMgrs/UserManager');

// make variable _db is global new database
var _db = require('./modelMgrs/Database');
app.locals._db = new _db();

// make variable cachedata is global for caching wallet data
app.locals.cachedata = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  cookie : {
    maxAge : 1000*60*30
  },
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// folder uploads
app.use('/uploads',express.static('uploads'));

// router api
const api_workers = require('./routes/api/workers/workerApi');
const api_users = require('./routes/api/account/accountApi');
const api_wallets = require('./routes/api/wallet/walletApi');
const api_promotions = require('./routes/api/promotions/promotionApi');
const api_wallet_balance = require('./routes/api/wallet/walletBalanceApi');
const api_pools = require('./routes/api/pools/poolApi');

app.use('/api/v1/workers', api_workers);
app.use('/api/v1/users', api_users);
app.use('/api/v1/wallets', api_wallets);
app.use('/api/v1/promotions', api_promotions);
app.use('/api/v1/walletbalance', api_wallet_balance);
app.use('/api/v1/pools', api_pools);
// app.use(csrf({cookie:true}));

// router admin
var developer_log = require('./routes/develop/log');
app.use('/develop/log', developer_log);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

passport.use(new LocalStrategy(
  async function(username, password, done) {
    var userMgr = new userManager(app.locals._db);
    var user = await userMgr.getUserByEmailAndPassword(username, password);
    if (user !== null) {
      return done(null, user);
    }
    else {
      return done(null, false, {message: 'Incorrect password.'})
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.getUserId());
});

passport.deserializeUser(async function(id, done) {
  var userMgr = new userManager(app.locals._db);
  var user = await userMgr.getUserById(id);
  if (user !== null) {
    return done(null, user.getUserId());
  }
  else {
    return done(null, false, {message: 'Incorrect password.'})
  }
});
module.exports = app;
