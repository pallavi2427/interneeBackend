"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    return transporter.sendMail({
        from: "pallavi.sisodiya9009@gmail.com",
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
exports.default = exports.sendEmail;
//# sourceMappingURL=sendEmail.js.map