"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logErrorOccurred = (filePath, err) => {
    console.log(filePath);
    console.log("Inside Catch ************* Problem:" + err.message);
    console.log("Inside Catch ************* Problem:" + err.stack);
    console.log("Inside Catch ************* Problem:" + err);
};
exports.default = logErrorOccurred;
//# sourceMappingURL=general.js.map