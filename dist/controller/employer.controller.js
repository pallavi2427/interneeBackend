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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employerController = void 0;
const employer_model_1 = require("../models/employer.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendverificationEmail = require("../utils/sendverifactionEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
class employerController {
    //Employer register//
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
                const employer = yield employer_model_1.EmployerModel.create({
                    email: req.body.email,
                    password: yield bcrypt_1.default.hash(req.body.password, 10),
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    contact_number: req.body.contact_number,
                    company_name: req.body.company_name,
                    industry: req.body.industry,
                    designation: req.body.designation,
                    number_of_employees: req.body.number_of_employees,
                    company_address: req.body.company_address,
                    verification_token: crypto_1.default.randomBytes(40).toString("hex"),
                });
                const result = yield employer.save();
                if (employer) {
                    yield sendverificationEmail({
                        name: employer.first_name,
                        company_name: employer.company_name,
                        email: employer.email,
                        token: employer.verification_token,
                    });
                    const response = {
                        success: true,
                        status: 200,
                        message: "Employer registered successfully!",
                        // You can include additional data if needed
                    };
                    return res.status(response.status).json(response);
                }
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    //Employer login//
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            try {
                const employer = yield employer_model_1.EmployerModel.findOne({ where: { email } });
                if (!employer) {
                    return res.status(404).json({ message: "Employer not found" });
                }
                if (!employer.isVerified) {
                    return res.status(401).json({
                        message: "Email not verified. Please check your email for verification instructions.",
                    });
                }
                const isPasswordCorrect = yield bcrypt_1.default.compare(password, employer.password);
                if (isPasswordCorrect) {
                    // Generate access token
                    const accessToken = jsonwebtoken_1.default.sign({
                        data: {
                            id: employer.id,
                            email: employer.email,
                            first_name: employer.first_name,
                        },
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" });
                    // Generate refresh token
                    const refreshToken = jsonwebtoken_1.default.sign({
                        data: {
                            id: employer.id,
                            email: employer.email,
                            first_name: employer.first_name,
                            token: accessToken,
                        },
                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" });
                    // Return success response
                    res.status(200).json({
                        success: true,
                        message: "Login Successful",
                        data: {
                            employer,
                            accessToken,
                            refreshToken,
                        },
                    });
                }
                else {
                    res.status(401).json({ message: "Password doesn't match" });
                }
            }
            catch (error) {
                // Handle any errors that occur during the process
                console.error("Login error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    //Get All Employer data//
    static employerData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield employer_model_1.EmployerModel.findAll();
                return res.json({ employer: data });
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
    // Email verification after Registration//
    static verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield employer_model_1.EmployerModel.findOne({
                    where: { email: req.query.email },
                });
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                }
                if (user.verification_token !== req.query.verification_token) {
                    return res.status(400).json({
                        success: false,
                        message: "Verification does not match",
                    });
                }
                user.isVerified = true;
                yield user.save();
                return res.status(200).json({
                    success: true,
                    message: "Email verified successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    static rejectEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield employer_model_1.EmployerModel.findOne({
                    where: { email: req.query.email },
                });
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                }
                if (user.verification_token !== req.query.verification_token) {
                    return res.status(400).json({
                        success: false,
                        message: "Verification does not match",
                    });
                }
                user.verification_token = "";
                user.isVerified = false;
                yield user.save();
                return res.status(200).json({
                    success: true,
                    message: "Email Rejected!!!!",
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            try {
                const userId = req.params.id;
                console.log(userId);
                const existingProfile = yield employer_model_1.EmployerModel.findOne({
                    where: { id: userId },
                });
                console.log(existingProfile);
                if (existingProfile) {
                    const updatedProfile = yield employer_model_1.EmployerModel.update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        contact_number: req.body.contact_number,
                        industry: req.body.industry,
                        designation: req.body.designation,
                        number_of_employees: req.body.number_of_employees,
                        company_address: req.body.company_address,
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
        });
    }
}
exports.employerController = employerController;
//# sourceMappingURL=employer.controller.js.map