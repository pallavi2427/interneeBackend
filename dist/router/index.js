"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const student_routes_1 = require("./student.routes");
const employer_routes_1 = require("./employer.routes");
const blog_routes_1 = require("./blog.routes");
const internship_routes_1 = require("./internship.routes");
const course_routes_1 = require("./course.routes");
const job_routes_1 = require("./job.routes");
const coursestd_routes_1 = require("./coursestd.routes");
const jobapply_routes_1 = require("./jobapply.routes");
const internapply_routes_1 = require("./internapply.routes");
const jobinternship_routes_1 = require("./jobinternship.routes");
const contactus_routes_1 = require("./contactus.routes");
const campus_routes_1 = require("./campus.routes");
function initRoutes(app) {
    app.get("/api", (req, res) => res.status(200).send({
        message: "server is listening!",
    }));
    (0, student_routes_1.StudentRoutes)(app);
    (0, employer_routes_1.EmployerRoutes)(app);
    (0, blog_routes_1.BlogRoutes)(app);
    (0, internship_routes_1.InternRoutes)(app);
    (0, course_routes_1.CourseRoutes)(app);
    (0, job_routes_1.JobRoutes)(app);
    (0, coursestd_routes_1.CoursestdRoutes)(app);
    (0, jobapply_routes_1.JobApplyRoutes)(app);
    (0, internapply_routes_1.internsApplyRoutes)(app);
    (0, jobinternship_routes_1.JobInternshipRoutes)(app);
    (0, contactus_routes_1.ContactusRoutes)(app);
    (0, campus_routes_1.CampusRoutes)(app);
    app.all("*", (req, res) => res.status(404).send());
}
exports.initRoutes = initRoutes;
//# sourceMappingURL=index.js.map