"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const course_controller_1 = require("../controller/course.controller");
function CourseRoutes(app) {
    app.post("/course/add", course_controller_1.courseController.postCourse);
    app.get("/course/get-all", course_controller_1.courseController.allCourse);
}
exports.CourseRoutes = CourseRoutes;
//# sourceMappingURL=course.routes.js.map