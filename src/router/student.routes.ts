import { studentController } from "../controller/student.controller";
import { Express } from "express";
import val from "../utils/validations";
const nodemailer = require("nodemailer");
import path from "path";
import auth from "../middlware/auth";

export function StudentRoutes(app: Express) {
  app.post("/register", val("studentregister"), studentController.register);
  app.post("/login", val("login"), studentController.login);
  app.put("/profile/:id", studentController.profile);
  app.post(
    "/forget-password",
    val("forgot"),
    studentController.forget_password
  );
  app.post("/reset-password", studentController.reset_password);
  app.put(
    "/change-password",
    val("changePassword"),
    studentController.change_password
  );
  app.get("/allStudentData",studentController.AllStudentData);
  app.get("/studentData/:id", studentController.studentData);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "swapnil.devyanitechnologies@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  app.post("/send-email", (req: any, res) => {
    const { subject, email, message } = req.body;

    // Email data
    const mailOptions = {
      from: "swapnil.devyanitechnologies@gmail.com", // Use a verified Gmail address here
      to: email,
      subject: subject,
      text: message,
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });

    // Send the email
    return new Promise<void>((resolve, reject) => {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve();
        }
      });
    });
  });
  app.get("/download/:filename", studentController.download);
  app.delete("/deleteStudent/:id", studentController.delStudent);
}
