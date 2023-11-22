"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const student_controller_1 = require("../controller/student.controller");
const validations_1 = require("../utils/validations");
const nodemailer = require("nodemailer");
function StudentRoutes(app) {
    app.post("/register", (0, validations_1.default)("studentregister"), student_controller_1.studentController.register);
    app.post("/login", (0, validations_1.default)("login"), student_controller_1.studentController.login);
    app.put("/profile/:id", student_controller_1.studentController.profile);
    app.post("/forget-password", (0, validations_1.default)("forgot"), student_controller_1.studentController.forget_password);
    app.post("/reset-password", student_controller_1.studentController.reset_password);
    app.put("/change-password", (0, validations_1.default)("changePassword"), student_controller_1.studentController.change_password);
    app.get("/allStudentData", student_controller_1.studentController.AllStudentData);
    app.get("/studentData/:id", student_controller_1.studentController.studentData);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "pallavi.sisodiya9009@gmail.com",
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    app.post("/send-email", (req, res) => {
        const { subject, email, message } = req.body;
        const mailOptions = {
            from: "pallavi.sisodiya9009@gmail.com",
            to: email,
            subject: subject,
            text: message,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to send email" });
            }
            else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ message: "Email sent successfully" });
            }
        });
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log("Email sent: " + info.response);
                    resolve();
                }
            });
        });
    });
    app.get("/download/:filename", student_controller_1.studentController.download);
    app.delete("/deleteStudent/:id", student_controller_1.studentController.delStudent);
}
exports.StudentRoutes = StudentRoutes;
//# sourceMappingURL=student.routes.js.map