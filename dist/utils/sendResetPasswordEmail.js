"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = require("./sendEmail");
const sendResetPassswordEmail = async ({ name, email, token, origin = "http://localhost:4200", }) => {
    const resetURL = `${origin}/verification/?password_token=${token}&email=${email}`;
    const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;
    return (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "Reset Password",
        html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
    });
};
module.exports = sendResetPassswordEmail;
//# sourceMappingURL=sendResetPasswordEmail.js.map