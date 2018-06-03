'use strict';

var SupportContentObject = require('../models/SupportContent');

class SupportContentManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }
}

module.exports = SupportContentManager;