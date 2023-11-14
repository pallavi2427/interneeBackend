import nodemailer from "nodemailer";
const nodemailerConfig = require("./nodemailerConfig");

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({
    from: "pallavi.sisodiya9009@gmail.com", // sender address
    to,
    subject,
    html,
  });
};

export default sendEmail;
