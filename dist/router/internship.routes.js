"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternRoutes = void 0;
const internship_controller_1 = require("../controller/internship.controller");
function InternRoutes(app) {
    app.post("/internship", internship_controller_1.internshipController.postInternship);
    app.get("/allInternship", internship_controller_1.internshipController.AllInternship);
}
exports.InternRoutes = InternRoutes;
//# sourceMappingURL=internship.routes.js.map