import { StudentModel } from "../models/student.model";
import * as fs from "fs";
import * as path from "path";

import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { uploadFile } from "../utils/multer";
import { validationResult } from "express-validator";
const createOTP = require("../utils/otp");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const baseUrl = "../../src/upload";
export class studentController {
  //Student Register//
  static async register(req: any, res: any) {
    try {
      uploadFile;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const files = req.file?.filename;
      const student = await StudentModel.create({
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
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  //Student login//
  static async login(req: any, res: any) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const Student = await StudentModel.findOne({ where: { email } });
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        Student.password
      );
      if (isPasswordCorrect) {
        // generate access and refresh token and mark user login in DB
        const [accesstoken] = await Promise.all([
          jwt.sign(
            {
              data: {
                id: Student.id,
                email: Student.email,
                first_name: Student.first_name,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "365d" }
          ),
        ]);
        const refreshtoken = jwt.sign(
          {
            data: {
              id: Student.id,
              email: Student.email,
              first_name: Student.first_name,
              token: accesstoken,
            },
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "365d" }
        );
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
      } else {
        res.status(404).send({ message: "Password doesn't match" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  // Forget Password//
  static async forget_password(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { email } = req.body;
      const user = await StudentModel.findOne({
        where: { email },
      });

      if (user) {
        const password_token = createOTP();

        await sendResetPasswordEmail({
          name: user.first_name,
          email: user.email,
          token: password_token, // Use password_token, not user.password_token
        });

        const tenMinutes = 1000 * 60 * 60;
        const password_token_expiration_date = new Date(
          Date.now() + tenMinutes
        );

        // Update user's password_token and password_token_expiration_date
        user.password_token = password_token;
        user.password_token_expiration_date = password_token_expiration_date;

        // Save the updated user
        await user.save();

        res
          .status(200)
          .json({ msg: "Please check your email for reset password link" });
      } else {
        res.status(400).json({ msg: "This email is not registered" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" }); // Handle errors appropriately
    }
  }
  // reset password post//
  static async reset_password(req: any, res: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { password_token, email, password } = req.body;
      // Find the student record by email
      const resetPassword = await StudentModel.findOne({ where: { email } });
      console.log("huhhu", req.body);

      if (resetPassword) {
        if (resetPassword.password_token === password_token) {
          const passwordNow = await bcrypt.hash(password, 10);
          const updatedStudent = await StudentModel.update(
            {
              password: passwordNow,
              password_token: null,
            },
            { where: { email } }
          );
          if (updatedStudent) {
            const response = {
              success: true,
              status: 200,
              message: "Password reset successful",
              data: resetPassword,
            };
            return res.status(response.status).json(response);
          } else {
            return res.send("Password update failed");
          }
        } else {
          return res.send("Invalid password token");
        }
      } else {
        return res.send("User not found");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error"); // Handle errors gracefully
    }
  }
  // Change Password //
  static async change_password(req: any, res: any) {
    const { oldpassword, newPassword, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      if (!oldpassword || !newPassword || !email) {
        return res.status(400).json({
          error: "Please provide oldpassword, newPassword, and userId",
        });
      }
      const student = await StudentModel.findOne({
        where: {
          email: email,
        },
      });
      if (!student) {
        return res.status(404).json({ error: "User not found" });
      }
      const isPasswordCorrect = await bcrypt.compare(
        oldpassword,
        student.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Update the user's password in the database
      await StudentModel.update(
        {
          password: hashedPassword,
        },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(200).json({ msg: "Success! Password Updated." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  //Update Student Profile By Id//
  static async profile(req: any, res: any) {
    try {
      const userId = req.params.id;
      console.log(userId);

      const existingProfile = await StudentModel.findOne({
        where: { id: userId },
      });
      console.log(existingProfile);
      if (existingProfile) {
        const updatedProfile = await StudentModel.update(
          {
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
  //All Student Data//
  static async AllStudentData(req: any, res: any) {
    try {
      const data = await StudentModel.findAll();
      return res.json({ student: data });
    } catch (err) {
      console.log("Error", err);
    }
  }
  //GET Student Data By Id//
  static async studentData(req: any, res: any) {
    const id = req.params.id;
    try {
      const data = await StudentModel.findAll({
        where: { id: id },
      });
      return res.json({ student: data });
    } catch (err) {
      console.log("Error", err);
    }
  }
  static async download(req: any, res: any) {
    console.log(req);

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
    } catch (err) {
      console.error("Error in download function:", err);
      res.status(500).send("Internal Server Error");
    }
  }
  static async delStudent(req: any, res: any) {
    try {
      const id = req.params.id;
      const deleted = await StudentModel.destroy({ where: { id } });
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
    } catch (e) {
      console.error(`Error in deleting: ${e.message}`);
      // You may want to respond with an error status code and message here
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
