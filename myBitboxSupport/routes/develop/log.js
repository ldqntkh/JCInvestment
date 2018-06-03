var express = require('express');
var router = express.Router();
var passport = require('passport');

const logFile = require('../../globalFunctions');

router.get('/', async (req, res, next)=> {
    let results = await logFile.readLogFile();
    let jsonResult = '[' + results.substr(0, results.length - 1) + ']';

    jsonResult = JSON.parse(jsonResult);

    res.render('develop/log', { 
        title: 'Log',
        data : jsonResult
    });
})

module.exports = router;
