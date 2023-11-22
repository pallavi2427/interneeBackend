"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer = require("multer");
const path = require("path");
const baseUrl = "../../src/upload";
const filePath = path.join(__dirname, baseUrl);
const fullfilePath = path.join(filePath, "/");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fullfilePath);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});
exports.uploadFile = multer({ storage }).single("attach_resume");
//# sourceMappingURL=multer.js.map