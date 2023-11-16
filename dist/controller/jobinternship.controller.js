"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobinternshipdController = void 0;
const student_model_1 = require("../models/student.model");
const job_model_1 = require("../models/job.model");
const jobintership_model_1 = require("../models/jobintership.model");
const internship_model_1 = require("../models/internship.model");
class jobinternshipdController {
    static async studentjob(req, res) {
        var _a, _b;
        const student_id = req.body.student_id;
        const job_id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.job_id;
        const internship_id = (_b = req.body) === null || _b === void 0 ? void 0 : _b.internship_id;
        const type = req.body.type;
        console.log(student_id, job_id, internship_id, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        try {
            const studentData = await student_model_1.StudentModel.findOne({
                where: { id: student_id },
            });
            if (!studentData) {
                return res.status(404).json({ error: "Student not found" });
            }
            const jobData = await job_model_1.JobModel.findOne({
                where: { id: job_id },
            });
            if (!jobData) {
                return res.status(404).json({ error: "job not found" });
            }
            const internData = await internship_model_1.InternshipModel.findOne({
                where: { id: internship_id },
            });
            const existingLink = await jobintership_model_1.JobinternshipModel.findOne({
                where: { job_id: job_id, student_id: student_id },
            });
            if (!existingLink) {
                const std = await jobintership_model_1.JobinternshipModel.create({
                    job_id: job_id,
                    internship_id: internship_id,
                    student_id: student_id,
                    type: type,
                    isApplied: 1,
                });
                const result = await std.save();
                if (result) {
                    const response = {
                        success: true,
                        status: 200,
                        message: "Applied successfully!",
                        data: std,
                    };
                    return res.status(response.status).json(response);
                }
            }
            else if (!existingLink.isApplied) {
                existingLink.isApplied = 1;
                const result = await existingLink.save();
                if (result) {
                    const response = {
                        success: true,
                        status: 200,
                        message: "Student already applied for this job",
                    };
                    return res.status(response.status).json(response);
                }
            }
            else {
                return res.status(401).json({
                    message: "Student already applied for this course",
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.jobinternshipdController = jobinternshipdController;
//# sourceMappingURL=jobinternship.controller.js.map