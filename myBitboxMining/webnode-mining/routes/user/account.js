var express = require('express');
var router = express.Router();

// import const
const language = require('../../const/variableLabel');

router.get('/user/register', function(req, res, next) {
    //if (req.session.customer) return res.redirect('/');
    res.render('user/register', {
        title: 'Register user'
    });
});
module.exports = router;