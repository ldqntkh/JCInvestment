var express = require('express');
var router = express.Router();
var UserManager = require('../../modelMgrs/UserManager');
var db = require('../../modelMgrs/Database');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('customer/index', {
        "title" : "Dashborad",
        "menu_active": "dashboard"
    });
});

router.get('/user', function (req, res, next) {
    res.render('customer/index', {
        "title" : "User Profile",
        "menu_active": "user"
    });
});

router.get('/login', function(req, res, next) {
    res.render('customer/login', {
        "title": "User Login"
    });
});

router.post('/user/loginform', async (req, res, next) => {
    try {
        var user = {
            username: req.body.username,
            password: req.body.password
        };
        var errorMessage = null;
        var userMgr = new UserManager(new db());
        var user = await userMgr.getUserByUsernamelAndPassword(user.username, user.password);

        if (req.body.username === '' || req.body.password === '') {
            errorMessage = 'Username or password is missing';
        }
        if (user !== null) {
            return res.redirect('/');
        } else {
            errorMessage = 'Incorrect password';
        }

        res.render('customer/login', {
            "title": "User Login",
            errorMessage: errorMessage
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
