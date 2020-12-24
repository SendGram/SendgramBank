const nodemailer = require('nodemailer');
const { emailConfig } = require('../../config/vars');
const Email = require('email-templates');

const transporter = nodemailer.createTransport({
    port: emailConfig.port,
    host: emailConfig.host,
    auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
    },
    secure: false,
});

/*transporter.verify((error) => {
    if (error) {
        console.log('error with email connection');
    }
});
*/

exports.sendPasswordReset = async(resetTokenObj, address) => {
    const email = new Email({
        views: { root: __dirname },
        message: {
            from: 'noreply@app.com',
        },
        send: true,
        transport: transporter,
    });

    email.send({
            template: 'passwordReset',
            message: {
                to: address,
            },
            locals: {
                productName: 'Express-mongo-login',
                code: resetTokenObj.resetToken,
            },
        })
        .catch((err) => console.log('error sending password reset email: ', err));
};