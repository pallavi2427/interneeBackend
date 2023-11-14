import jwt from "jsonwebtoken";
import { StudentModel } from "../models/student.model";
import { EmployerModel } from "../models/employer.model";

import logErrorOccurred  from "../utils/general";

/**
 * @description Authorization middleware function
 */
export default async function (req:any, res:any, next:any) {
    try {
      // Get token from header
      const token = req.header("authorization");
      
      if (!token) {
          throw new Error("NO_TOKEN");
        }
        
        const data  = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = data;
     
      console.log(userId);
      
      // console.log(user)
    //   let employer = await EmployerModel.findOne({
    //     where: { userId: userId },
    //     raw: true,
    //   });

    //   switch (true) {
    //     case user == undefined:
    //     case user === null: {
    //       throw new Error("USER_NOT_EXIST");
    //     }
    //   }

      req.user = userId;
      console.log(req.user);

    //   req.user.employer = employer;
      // console.log(req)
      next();
    } catch (err) {
      logErrorOccurred(__filename, err);
      switch (err.message) {
        case "USER_NOT_EXIST":
          return res.json({
            code: 200,
            msg: "USER_NOT_EXIST",
          });
        case "NO_TOKEN":
          return res.status(401).json({
            code: 401,
            msg: "NO_TOKEN",
          });
      }
    }};
