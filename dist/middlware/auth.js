"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const general_1 = require("../utils/general");
async function default_1(req, res, next) {
    try {
        const token = req.header("authorization");
        if (!token) {
            throw new Error("NO_TOKEN");
        }
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = data;
        console.log(userId);
        req.user = userId;
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
}
exports.default = default_1;
;
//# sourceMappingURL=auth.js.map