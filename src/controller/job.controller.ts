import { Result } from "express-validator";
import { JobModel } from "../models/job.model";

export class JobController {
  static async postJob(req: any, res: any) {
    try {
      const job = await JobModel.create({
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
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async getAllJob(req: any, res: any) {
    try {
      const data = await JobModel.findAll();
      return res.json({ jobs: data });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  }
  static async delJob(req: any, res: any) {
    try {
      const id = req.params.id;
      const deleted = await JobModel.destroy({ where: { id } });
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
    } catch (e) {
      console.error(`Error in deleting: ${e.message}`);
      // You may want to respond with an error status code and message here
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
