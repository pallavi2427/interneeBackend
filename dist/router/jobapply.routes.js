"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyRoutes = void 0;
const jobapply_controller_1 = require("../controller/jobapply.controller");
function JobApplyRoutes(app) {
    //Apply student for job//
    app.post("/applyjob/add", jobapply_controller_1.JobApplyController.jobApply);
    // get student who apply for job//
    app.get("/studentJob", jobapply_controller_1.JobApplyController.allstudentJob);
}
exports.JobApplyRoutes = JobApplyRoutes;
//# sourceMappingURL=jobapply.routes.js.map