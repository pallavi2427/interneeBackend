"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobInternshipRoutes = void 0;
const jobinternship_controller_1 = require("../controller/jobinternship.controller");
function JobInternshipRoutes(app) {
    app.post("/studentjob/apply", jobinternship_controller_1.jobinternshipdController.studentjob);
}
exports.JobInternshipRoutes = JobInternshipRoutes;
//# sourceMappingURL=jobinternship.routes.js.map