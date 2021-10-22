const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require("nodemailer-express-handlebars");

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c4e7dfe9b94450",
        pass: "83ea5351605ebf"
    }
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("./api/email_templates/"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./api/email_templates/"),
};

transporter.use("compile", hbs(handlebarOptions));

module.exports.sendVerificationEmail = async (user, verifyToken) => {
    const mailOptions = {
        from: 'surajboniwal04@gmail.com',
        to: user.email,
        subject: 'Welcome to Hotel Story',
        template: 'email',
        context: {
            name: user.name.first,
            verifyUrl: `http://${process.env.HOST}/api/auth/verify/${verifyToken}`
        }
    }

    await transporter.sendMail(mailOptions)
}