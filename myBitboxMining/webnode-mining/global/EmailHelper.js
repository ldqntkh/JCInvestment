'use strict';
var nodemailer = require('nodemailer');

class EmailHelper {
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
                console.log('error while trying to send email: ' + error.message);
                return null;
            }
            transporter.close();
            return info;
        });
    }
}

module.exports = EmailHelper;