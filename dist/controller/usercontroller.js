// const User = require("../models/User");
// import * as crypto from "crypto";
// //const bcryptjs=require('bcryptjs')
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { Op } = require("sequelize");
// const createOTP = require("../utils/otp");
// const createhash = require("../utils/createhash");
// //const sendVerificationEmail = require("../utils/sendverifactionEmail")
// const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
// const validation = require("../utils/validations");
// //
// exports.register = async (req, res) => {
//   // Save User to Database
//   // const {password}=req.body
//   try {
//     const user = await User.create({
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       mobile_number: req.body.mobile_number,
//       email: req.body.email,
//       password: await bcrypt.hash(req.body.password, 8),
//       // verification_token: crypto.randomBytes(40).toString("hex"),
//     });
//     const result = user.save();
//     if (result) res.send({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
// // const verifyEmail = async (req, res) => {
// //   const { verificationToken, email } = req.body;
// //  const user = await User.findOne({ where: { email } });
// //  if (!user) {
// //    return res.send("Verification Failed");
// //  }
// //   if (user.verificationToken !== verificationToken) {
// //    return res.send("Verification Failed");
// //  }
// //  // (user.isVerified = true), (user.verified = Date.now());
// // user.verificationToken = "";
// //   await user.save();
// //   res.status(200).json({ msg: "Email Verified"});
// // };
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body, "bbbbbbbbbb");
//     if (!email || !password) {
//       return res.send("Please provide email and password");
//     }
//     const user = await User.findOne({ where: { email } });
//     //  console.log(user,'vbvvvvv')
//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     console.log(isPasswordCorrect, "vbvvvvv");
//     if (isPasswordCorrect) {
//       let Token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: "1hr",
//       });
//       if (Token) {
//         res.json({ message: "Login Successfull", success: true, Token });
//       }
//       console.log(Token);
//     } else {
//       res.json({ message: "Invalid User", success: false });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   console.log(req.body);
//   // console.log(req.body, 'mlllll........')
//   const user = await User.findOne({
//     Where: { email },
//   });
//   // console.log(user, 'data.....')
//   if (user) {
//     const password_token = createOTP();
//     //console.log(password_token,'pas>>>>>>>>>>>')
//     await sendResetPasswordEmail({
//       name: user.name,
//       email: user.email,
//       token: password_token,
//       //origin,
//     });
//     // console.log(password_token, 'hhhhh..........')
//     const tenMinutes = 1000 * 60 * 10;
//     const password_token_expiration_date = new Date(Date.now() + tenMinutes);
//     user.password_token = password_token;
//     console.log(user.password_token, "lllllllllllll");
//     user.password_token_expiration_date = password_token_expiration_date;
//     await user.save();
//     res
//       .status(200)
//       .json({ msg: "Please check your email for reset password link" });
//   } else {
//     res.status(400).json({ msg: "not forgot" });
//   }
// };
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, email, password } = req.body;
//     const tokendata = await User.findOne({ Where: { email } });
//     if (tokendata) {
//       const isPassword = await bcrypt.hash(req.body.password, 10);
//       if ((tokendata.password_token = token)) {
//         const code = {
//           password: isPassword,
//           password_token: null,
//         };
//         console.log(code, "pas>>>>>>>>>>>");
//         await User.update(code, { where: { email } });
//         res.send("Password reset successful");
//       } else {
//         res.send("Something is going to wrong");
//       }
//     } else {
//       res.send("User not found");
//     }
//   } catch (error) {
//     return res.send("error");
//   }
// };
// exports.changepassword = async (req, res) => {
//   try {
//     const { id } = req.user;
//     console.log(id, "id>>>>>>>>>.");
//     const { newPassword, oldPassword } = req.body;
//     const set = {
//       passwordUpdated: "1",
//       password: await User(newPassword),
//     };
//     const user = await db.User.findOne({
//       attributes: ["id"],
//       where: { id },
//     });
//     if (user.dataValues.passwordUpdated == null) {
//       if (oldPassword != user.dataValues.password) {
//         return res.json("error.INVALID_CREDENTIAL");
//       } else {
//         var isPlaintext = "yes";
//       }
//     } else {
//       const isEqual = await bcrypt(oldPassword, user.dataValues.password);
//       if (!isEqual) {
//         return res.json("error.INVALID_CREDENTIAL1");
//       } else {
//         var isPlaintext = "no";
//       }
//     }
//     var transaction = await db.sequelize.transaction();
//     await db.User.update(set, { transaction, where: { id } });
//     if (req.resetPassword?.status) {
//       await db.ForgotPassword.update(
//         { resetPasswordStatus: 1 },
//         { transaction, where: { userId: id, id: req.resetPassword?.id } }
//       );
//     }
//     await transaction.commit();
//     return res.json("PASSWORD_CHANGED");
//   } catch (error) {
//     return res.json("error");
//   }
// };
//# sourceMappingURL=usercontroller.js.map