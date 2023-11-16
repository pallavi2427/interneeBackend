"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRoutes = void 0;
const job_controller_1 = require("../controller/job.controller");
function JobRoutes(app) {
    app.post("/job/add", job_controller_1.JobController.postJob);
    app.get("/getAllJobs", job_controller_1.JobController.getAllJob);
    app.delete("/deleteJob/:id", job_controller_1.JobController.delJob);
}
exports.JobRoutes = JobRoutes;
//# sourceMappingURL=job.routes.js.map