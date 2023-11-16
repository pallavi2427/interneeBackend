"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_model_1 = require("../models/job.model");
class JobController {
    static async postJob(req, res) {
        try {
            const job = await job_model_1.JobModel.create({
                company_name: req.body.company_name,
                title: req.body.title,
                location: req.body.location,
                experience: req.body.experience,
                salary: req.body.salary,
                jobdesc: req.body.jobdesc,
                postBy: req.body.postBy,
            });
            const result = job.save();
            if (result) {
                const response = {
                    success: true,
                    status: 200,
                    message: "Job Post Successfully",
                    data: job,
                };
                return res.status(response.status).json(response.data);
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async getAllJob(req, res) {
        try {
            const data = await job_model_1.JobModel.findAll();
            return res.json({ jobs: data });
        }
        catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
    static async delJob(req, res) {
        try {
            const id = req.params.id;
            const deleted = await job_model_1.JobModel.destroy({ where: { id } });
            if (deleted === 0) {
                return res
                    .status(404)
                    .json({ success: false, message: "Record not found" });
            }
            const response = {
                success: true,
                status: 200,
                message: "Deletion successful",
            };
            return res.status(response.status).json(response);
        }
        catch (e) {
            console.error(`Error in deleting: ${e.message}`);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map