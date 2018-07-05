var express = require('express');
var router = express.Router();

// import const
const FileHelper = require('../../global/FileHelper');
const showAdminMessage = FileHelper.showAdminMessage;
const UserManager = require('../../modelMgrs/UserManager');
const UserObj = require('../../models/User');

router.get('/admin', (req, res) => {
    if (!req.session.user || (req.session.user && req.session.user.userTypeId !== 1)) return res.redirect('/admin/login');

    res.render('admin/user/dashboard', {
        "title" : showAdminMessage('TITLE_CUSTOMER_DASHBOARD'),
        "menu_active": "dashboard",
        "fullname" : req.session.user.fullname
    });
});

router.get('/admin/user/index', async (req, res) => {
    if (!req.session.user || (req.session.user && req.session.user.userTypeId !== 1)) return res.redirect('/admin/login');

    let userList = await UserManager.getAllUser({attributes: ['email', 'phone', 'fullname', 'active']});
    res.render('admin/user/dashboard', {
        title : showAdminMessage('TITLE_CUSTOMER_DASHBOARD'),
        menu_active: "user",
        fullname : req.session.user.fullname,
        userList: userList
    });
});

router.get('/admin/login', function(req, res) {
    res.render('admin/account/login', {
        "title": showAdminMessage('LABEL_LOGIN_TITLE')
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
                message = showAdminMessage('ERROR_ACCOUNT_NOT_ADMIN');
            }
        } else {
            message = showAdminMessage('ERROR_INCORRECT_ACCOUNT');
        }
        return res.render('admin/account/login', {
            title: showAdminMessage('LABEL_LOGIN_TITLE'),
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
        title: showAdminMessage('LABEL_CREATE_USER_TITLE'),
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
            userTypeId: 2
        };
        let result = {
            title: showAdminMessage('LABEL_CREATE_USER_TITLE'),
            resultTitle: showAdminMessage('LABEL_CREATE_USER_RESULT_TITLE'),
            backToButtonText: showAdminMessage('LABEL_BUTTON_BACK_TO_CREATE'),
            message: ''
        };

        if (await UserManager.getUserByField({username: user.username}) !== null) {
            result.errMessage.username = 'Username is existed. Please try again';
        } else {
            if (await UserManager.addUser(new UserObj(user)) !== null) {
                result.message = showAdminMessage('LABEL_CREATE_USER_SUCCESS_MESSAGE');
            } else {
                result.message = showAdminMessage('LABEL_CREATE_USER_SUCCESS_MESSAGE');
            }
        }
        res.render('admin/account/createresult', result);
    } catch(error) {
        console.log(showAdminMessage('ERROR_CREATE_USER_MESSAGE') + error.message);
        res.render();
    }
    res.render();
});
module.exports = router;