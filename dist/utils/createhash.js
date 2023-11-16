"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const createHash = async (password) => {
    try {
        const saltRounds = Math.floor(Math.random() * 10) + 5;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        console.error(err);
    }
};
exports.default = createHash;
//# sourceMappingURL=createhash.js.map