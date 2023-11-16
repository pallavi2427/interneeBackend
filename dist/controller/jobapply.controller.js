"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplyController = void 0;
const sequelize_1 = require("sequelize");
const jobapply_model_1 = require("../models/jobapply.model");
const student_model_1 = require("../models/student.model");
const job_model_1 = require("../models/job.model");
class JobApplyController {
    static async jobApply(req, res) {
        const student_id = req.body.student_id;
        const job_id = req.body.job_id;
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
                return res.status(404).json({ error: "Job not found" });
            }
            const existingLink = await jobapply_model_1.JobApplyModel.findOne({
                where: { job_id: job_id, student_id: student_id },
            });
            if (!existingLink) {
                const std = await jobapply_model_1.JobApplyModel.create({
                    job_id: job_id,
                    student_id: student_id,
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
                        status: 200,
                        message: "Student already applied for this job",
                    };
                    return res.status(response.status).json(response);
                }
            }
            else {
                return res.status(401).json({
                    message: "Student already applied for this job",
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async allstudentJob(req, res) {
        const { student_id } = req.query;
        try {
            const data3 = await jobapply_model_1.JobApplyModel.sequelize.query(`SELECT 
        jobapply.id As jobId, 
        job.id,
        jobapply.student_id
        FROM students 
        INNER JOIN jobapply ON jobapply.student_id = students.id 
        INNER JOIN job ON job.id = jobapply.job_id WHERE jobapply.student_id=:student_id`, {
                replacements: { student_id: student_id },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (data3.length === 0) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json({ student: data3 });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.JobApplyController = JobApplyController;
//# sourceMappingURL=jobapply.controller.js.map