"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const baseUrl = "../../src/upload";
const filePath = path_1.default.join(__dirname, baseUrl);
const fullfilePath = path_1.default.join(filePath, '/');
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where the PDF files will be stored
        cb(null, fullfilePath);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});
exports.uploadFile = (0, multer_1.default)({ storage }).single("attach_resume");
//# sourceMappingURL=multer.js.map