"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerRoutes = void 0;
const employer_controller_1 = require("../controller/employer.controller");
const validations_1 = __importDefault(require("../utils/validations"));
function EmployerRoutes(app) {
    app.post("/employer/register", (0, validations_1.default)("register"), employer_controller_1.employerController.register);
    app.post("/employer/login", (0, validations_1.default)("login"), employer_controller_1.employerController.login);
    app.get("/employer-alldata", employer_controller_1.employerController.employerData);
    app.get("/verifyEmail", employer_controller_1.employerController.verifyEmail);
    app.get("/rejectEmail", employer_controller_1.employerController.rejectEmail);
    app.put("/employer/profile/:id", employer_controller_1.employerController.profile);
}
exports.EmployerRoutes = EmployerRoutes;
//# sourceMappingURL=employer.routes.js.map