"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = require("./sendEmail");
// origin = "https://www.google.com",
const sendverificationEmail = ({ company_name, email, token, origin = "http://192.168.29.11:8080", }) => __awaiter(void 0, void 0, void 0, function* () {
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
});
module.exports = sendverificationEmail;
//# sourceMappingURL=sendverifactionEmail.js.map