"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_model_1 = require("../models/job.model");
class JobController {
    static postJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield job_model_1.JobModel.create({
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
        });
    }
    static getAllJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield job_model_1.JobModel.findAll();
                return res.json({ jobs: data });
            }
            catch (err) {
                return res.status(500).send("Internal Server Error");
            }
        });
    }
    static delJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deleted = yield job_model_1.JobModel.destroy({ where: { id } });
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
                // You may want to respond with an error status code and message here
                return res
                    .status(500)
                    .json({ success: false, message: "Internal Server Error" });
            }
        });
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map