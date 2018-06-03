'use strict';
let nodemailer = require('nodemailer');
const logFile =  require('../globalFunctions');

class Email {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'phatlonely@gmail.com',
                pass: 'vaqvimzqmhtqiydb'
            }
        });
    }

    async sendEmail(mailOptions) {
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return logFile.writeLogFile('Send email has some errors: ', __filename, 12, error);
            }
            transporter.close();
            return info;
        });
    }
}

module.exports = Email;