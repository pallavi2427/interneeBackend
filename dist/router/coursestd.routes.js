"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursestdRoutes = void 0;
const coursestd_controller_1 = require("../controller/coursestd.controller");
function CoursestdRoutes(app) {
    app.post("/studentCourse/add", coursestd_controller_1.coursestdController.studentCourse);
    app.get("/studentCourse", coursestd_controller_1.coursestdController.allstudentCourse);
}
exports.CoursestdRoutes = CoursestdRoutes;
//# sourceMappingURL=coursestd.routes.js.map