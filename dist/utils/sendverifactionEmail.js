"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = require("./sendEmail");
const sendverificationEmail = async ({ company_name, email, token, origin = "http://192.168.29.11:8080", }) => {
    const verify = `${origin}/verifyEmail?verification_token=${token}&email=${email}`;
    const message1 = `
  <p>${company_name}</p>
  
  <p>We just need to verify your email address before you can access.
  
   Your email  ${email} <a href="${verify}">Verify Email</a></p>
  
  <p>Thanks! – The team</p>`;
    return (0, sendEmail_1.sendEmail)({
        to: email,
        subject: "For Email Verification",
        html: `${message1}`,
    });
};
module.exports = sendverificationEmail;
//# sourceMappingURL=sendverifactionEmail.js.map