import * as multer from "multer";
import * as path from "path";
import * as util from "util";
const baseUrl = "../../src/upload";

const filePath = path.join(__dirname, baseUrl);
const fullfilePath = path.join(filePath, "/");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where the PDF files will be stored
    cb(null, fullfilePath);
  },
  filename: (req: any, file: any, cb: any) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const uploadFile = multer({ storage }).single("attach_resume");
