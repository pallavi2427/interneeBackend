import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import { EmployerModel } from "../models/employer.model";
const sendverificationEmail = require("../utils/sendverifactionEmail");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
export class employerController {
  //Employer register//
  static async register(req: any, res: any) {
    try {
      console.log(req,"reeeeeeeeeeeeeeee");
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const employer = await EmployerModel.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_number: req.body.contact_number,
        company_name: req.body.company_name,
        industry: req.body.industry,
        designation: req.body.designation,
        number_of_employees: req.body.number_of_employees,
        company_address: req.body.company_address,
        verification_token: crypto.randomBytes(40).toString("hex"),
      });
      const result = await employer.save();
      if (employer) {
        await sendverificationEmail({
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
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  //Employer login//
  static async login(req: any, res: any) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const employer = await EmployerModel.findOne({ where: { email } });

      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }

      if (!employer.isVerified) {
        return res.status(401).json({
          message:
            "Email not verified. Please check your email for verification instructions.",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        employer.password
      );

      if (isPasswordCorrect) {
        // Generate access token
        const accessToken = jwt.sign(
          {
            data: {
              id: employer.id,
              email: employer.email,
              first_name: employer.first_name,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "365d" }
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
          {
            data: {
              id: employer.id,
              email: employer.email,
              first_name: employer.first_name,
              token: accessToken,
            },
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "365d" }
        );
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
      } else {
        res.status(401).json({ message: "Password doesn't match" });
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  //Get All Employer data//
  static async employerData(req: any, res: any) {
    try {
      const data = await EmployerModel.findAll();
      return res.json({ employer: data });
    } catch (err) {
      console.log("Error", err);
    }
  }
  // Email verification after Registration//
  static async verifyEmail(req: any, res: any) {
    try {
      const user = await EmployerModel.findOne({
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
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async rejectEmail(req: any, res: any) {
    try {
      const user = await EmployerModel.findOne({
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
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Email Rejected!!!!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  static async profile(req: any, res: any) {

    try {
      const userId = req.params.id;
      console.log(userId);
      const existingProfile = await EmployerModel.findOne({
        where: { id: userId },
      });
      console.log(existingProfile);
      if (existingProfile) {
        const updatedProfile = await EmployerModel.update(
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            contact_number: req.body.contact_number,
            industry: req.body.industry,
            designation: req.body.designation,
            number_of_employees: req.body.number_of_employees,
            company_address: req.body.company_address,
          },
          {
            where: { id: userId },
          }
        );
        if (updatedProfile) {
          res.status(200).send({ message: "Profile Updated successfully!" });
        } else {
          res.status(500).send({ message: "Failed to update profile." });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
  static async appliedstd(req:any,res:any){
  }
}
