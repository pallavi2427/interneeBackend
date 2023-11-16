"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internsApplyRoutes = void 0;
const internapply_controller_1 = require("../controller/internapply.controller");
function internsApplyRoutes(app) {
    app.post("/internshipapply/add", internapply_controller_1.internapplyController.applyIntership);
    app.get("/studentInternship", internapply_controller_1.internapplyController.allstudentInterns);
}
exports.internsApplyRoutes = internsApplyRoutes;
//# sourceMappingURL=internapply.routes.js.map