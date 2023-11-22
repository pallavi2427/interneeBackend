"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusRoutes = void 0;
const campus_controller_1 = require("controller/campus.controller");
function CampusRoutes(app) {
    app.post("/campus", campus_controller_1.CampusController.postCampus);
}
exports.CampusRoutes = CampusRoutes;
//# sourceMappingURL=campus.routes.js.map