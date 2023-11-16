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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_1 = __importDefault(require("../utils/general"));
/**
 * @description Authorization middleware function
 */
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get token from header
            const token = req.header("authorization");
            if (!token) {
                throw new Error("NO_TOKEN");
            }
            const data = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
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
        }
        catch (err) {
            (0, general_1.default)(__filename, err);
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
        }
    });
}
exports.default = default_1;
;
//# sourceMappingURL=auth.js.map