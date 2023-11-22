"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_model_1 = require("../models/student.model");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer_1 = require("../utils/multer");
const express_validator_1 = require("express-validator");
const createOTP = require("../utils/otp");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const baseUrl = "../../src/upload";
class studentController {
    static async register(req, res) {
        var _a;
        try {
            multer_1.uploadFile;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const files = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const student = await student_model_1.StudentModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                contact_number: req.body.contact_number,
                attach_resume: files,
                current_city: req.body.current_city,
                gender: req.body.gender,
                language: req.body.language,
                type: req.body.type,
                course: req.body.course,
                college_name: req.body.college_name,
                stream: req.body.stream,
                start_year: req.body.start_year,
                end_year: req.body.end_year,
                area_of_interest: req.body.area_of_interest,
                currently_looking_for: req.body.currently_looking_for,
                work_mode: req.body.work_mode,
                verification_token: crypto.randomBytes(40).toString("hex"),
            });
            const result = student.save();
            if (result) {
                const response = {
                    success: true,
                    status: 200,
                    message: "User registered successfully!",
                    data: student,
                };
                return res.status(response.status).json(response);
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async login(req, res) {
        const { email, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const Student = await student_model_1.StudentModel.findOne({ where: { email } });
            const isPasswordCorrect = await bcrypt.compare(req.body.password, Student.password);
            if (isPasswordCorrect) {
                const [accesstoken] = await Promise.all([
                    jwt.sign({
                        data: {
                            id: Student.id,
                            email: Student.email,
                            first_name: Student.first_name,
                        },
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" }),
                ]);
                const refreshtoken = jwt.sign({
                    data: {
                        id: Student.id,
                        email: Student.email,
                        first_name: Student.first_name,
                        token: accesstoken,
                    },
                }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" });
                res.json({
                    status: 200,
                    success: true,
                    message: "Login Successfull",
                    data: {
                        Student,
                        accesstoken,
                        refreshtoken,
                    },
                });
            }
            else {
                res.status(404).send({ message: "Password doesn't match" });
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async forget_password(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { email } = req.body;
            const user = await student_model_1.StudentModel.findOne({
                where: { email },
            });
            if (user) {
                const password_token = createOTP();
                await sendResetPasswordEmail({
                    name: user.first_name,
                    email: user.email,
                    token: password_token,
                });
                const tenMinutes = 1000 * 60 * 60;
                const password_token_expiration_date = new Date(Date.now() + tenMinutes);
                user.password_token = password_token;
                user.password_token_expiration_date = password_token_expiration_date;
                await user.save();
                res
                    .status(200)
                    .json({ msg: "Please check your email for reset password link" });
            }
            else {
                res.status(400).json({ msg: "This email is not registered" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    }
    static async reset_password(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { password_token, email, password } = req.body;
            const resetPassword = await student_model_1.StudentModel.findOne({ where: { email } });
            console.log("huhhu", req.body);
            if (resetPassword) {
                if (resetPassword.password_token === password_token) {
                    const passwordNow = await bcrypt.hash(password, 10);
                    const updatedStudent = await student_model_1.StudentModel.update({
                        password: passwordNow,
                        password_token: null,
                    }, { where: { email } });
                    if (updatedStudent) {
                        const response = {
                            success: true,
                            status: 200,
                            message: "Password reset successful",
                            data: resetPassword,
                        };
                        return res.status(response.status).json(response);
                    }
                    else {
                        return res.send("Password update failed");
                    }
                }
                else {
                    return res.send("Invalid password token");
                }
            }
            else {
                return res.send("User not found");
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }
    }
    static async change_password(req, res) {
        const { oldpassword, newPassword, email } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            if (!oldpassword || !newPassword || !email) {
                return res.status(400).json({
                    error: "Please provide oldpassword, newPassword, and userId",
                });
            }
            const student = await student_model_1.StudentModel.findOne({
                where: {
                    email: email,
                },
            });
            if (!student) {
                return res.status(404).json({ error: "User not found" });
            }
            const isPasswordCorrect = await bcrypt.compare(oldpassword, student.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await student_model_1.StudentModel.update({
                password: hashedPassword,
            }, {
                where: {
                    email: email,
                },
            });
            res.status(200).json({ msg: "Success! Password Updated." });
        }
        catch (error) {
            console.error("Error changing password:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async profile(req, res) {
        try {
            const userId = req.params.id;
            console.log(userId);
            const existingProfile = await student_model_1.StudentModel.findOne({
                where: { id: userId },
            });
            console.log(existingProfile);
            if (existingProfile) {
                const updatedProfile = await student_model_1.StudentModel.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    contact_number: req.body.contact_number,
                    current_city: req.body.current_city,
                    gender: req.body.gender,
                    language: req.body.language,
                    type: req.body.type,
                    course: req.body.course,
                    college_name: req.body.college_name,
                    stream: req.body.stream,
                    start_year: req.body.start_year,
                    end_year: req.body.end_year,
                    area_of_interest: req.body.area_of_interest,
                    currently_looking_for: req.body.currently_looking_for,
                    work_mode: req.body.work_mode,
                }, {
                    where: { id: userId },
                });
                if (updatedProfile) {
                    res.status(200).send({ message: "Profile Updated successfully!" });
                }
                else {
                    res.status(500).send({ message: "Failed to update profile." });
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message });
        }
    }
    static async AllStudentData(req, res) {
        try {
            const data = await student_model_1.StudentModel.findAll();
            return res.json({ student: data });
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    static async studentData(req, res) {
        const id = req.params.id;
        try {
            const data = await student_model_1.StudentModel.findAll({
                where: { id: id },
            });
            return res.json({ student: data });
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    static async download(req, res) {
        try {
            const filename = req.params.filename;
            const filePath = path.join(__dirname, baseUrl + "/");
            const fullfilePath = path.join(filePath, filename);
            if (!fs.existsSync(filePath)) {
                return res.status(404).send("File not found");
            }
            res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
            const fileStream = fs.createReadStream(fullfilePath);
            fileStream.on("error", (err) => {
                console.error("Error reading file:", err);
                res.status(500).send("Internal Server Error");
            });
            fileStream.pipe(res);
        }
        catch (err) {
            console.error("Error in download function:", err);
            res.status(500).send("Internal Server Error");
        }
    }
    static async delStudent(req, res) {
        try {
            const id = req.params.id;
            const deleted = await student_model_1.StudentModel.destroy({ where: { id } });
            if (deleted === 0) {
                return res
                    .status(404)
                    .json({ success: false, message: "Record not found" });
            }
            const response = {
                success: true,
                status: 200,
                message: "Deletion successful",
            };
            return res.status(response.status).json(response);
        }
        catch (e) {
            console.error(`Error in deleting: ${e.message}`);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    }
}
exports.studentController = studentController;
//# sourceMappingURL=student.controller.js.map