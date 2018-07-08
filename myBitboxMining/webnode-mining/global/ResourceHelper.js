'use strict';

const language = require('../const/variableLabel');
const languageAdmin = require('../const/admin/variableLabel');

var ResourceHelper = {
    showMessage: (id, args) => {
        let message = language.en[id];
        if (typeof args !== 'undefined' && args.length > 0) {
            return ResourceHelper.replaceContent(message, args);
        }
        return message;
    },

    showAdminMessage: (id, args) => {
        let message = languageAdmin.en[id];
        if (typeof args !== 'undefined' && args.length > 0) {
            return ResourceHelper.replaceContent(message, args);
        }
        return message;
    },

    replaceContent: (message, args) => {
        for(let i = 0; i < args.length; i++) {
            message = message.replace('{' + i + '}', args[i]);
        }
        return message;
    }
}

module.exports = ResourceHelper;