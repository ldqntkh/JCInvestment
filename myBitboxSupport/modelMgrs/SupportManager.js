'use strict';

var SupportObject = require('../models/Support');

class SupportManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }
}

module.exports = SupportManager;