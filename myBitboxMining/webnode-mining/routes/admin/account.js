var express = require('express');
var router = express.Router();

// import const
const language = require('../../const/admin/variableLabel');
const FileHelper = require('../../private/js/FileHelper');
const UserManager = require('../../modelMgrs/UserManager');
const UserObj = require('../../models/User');

router.get('/admin', (req, res) => {
    if (!req.session.user || (req.session.user && req.session.user.userTypeId !== 1)) return res.redirect('/admin/login');

    res.render('admin/user/dashboard', {
        "title" : language.en.TITLE_CUSTOMER_DASHBOARD,
        "menu_active": "dashboard",
        "fullname" : req.session.user.fullname
    });
});

router.get('/admin/user/index', function(req, res) {
    if (!req.session.user || (req.session.user && req.session.user.userTypeId !== 1)) return res.redirect('/admin/login');

    res.render('admin/user/dashboard', {
        title : language.en.TITLE_CUSTOMER_DASHBOARD,
        menu_active: "user",
        fullname : req.session.user.fullname,
        language: language
    });
});

router.get('/admin/login', function(req, res) {
    res.render('admin/account/login', {
        "title": language.en.LABEL_LOGIN_TITLE,
        language: language
    });
})
.post('/admin/login', async (req, res) => {
    try {
        var message = null;
        var user = await UserManager.getUserByField({
            email: req.body.email,
            password: FileHelper.crypto(req.body.password)
        });

        if (user !== null) {
            if (user.getUserTypeId() === 1) {
                req.session.user = user;
                return res.redirect('/admin/user/index');
            } else {
                message = language.en.ERROR_ACCOUNT_NOT_ADMIN;
            }
        } else {
            message = language.en.ERROR_INCORRECT_ACCOUNT;
        }
        return res.render('admin/account/login', {
            title: language.en.LABEL_LOGIN_TITLE,
            language: language,
            message: message,
            email: req.body.email
        });
    } catch(err) {
        console.log(err);
    }
    res.send();
});

router.get('/admin/create', function(req, res, next) {
    if (!req.session.user || (req.session.user && req.session.user.userTypeId !== 1)) return res.redirect('/admin/login');
    res.render('admin/account/create', {
        title: language.en.LABEL_CREATE_USER_TITLE,
        menu_active: 'user'
    });
})
.post('/admin/create', async (req, res) => {
    try {
        let user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            fullname: req.body.fullname,
            phone: req.body.phone,
            userTypeId: req.body.userTypeId
        };
        let result = {
            title: language.en.LABEL_CREATE_USER_TITLE,
            resultTitle: language.en.LABEL_CREATE_USER_RESULT_TITLE,
            backToButtonText: language.en.LABEL_BUTTON_BACK_TO_CREATE,
            message: ''
        };

        if (await UserManager.addUser(new UserObj(user)) !== null) {
            result.message = language.en.LABEL_CREATE_USER_SUCCESS_MESSAGE;
        } else {
            result.message = language.en.LABEL_CREATE_USER_SUCCESS_MESSAGE;
        }
        res.render('admin/account/createresult', result);
    } catch(error) {
        console.log(language.en.ERROR_CREATE_USER_MESSAGE + error.message);
        res.render();
    }
    res.render();
});
module.exports = router;