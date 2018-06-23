var express = require('express');
var router = express.Router();

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

module.exports = router;
