import { QueryTypes } from "sequelize";
import { StudentModel } from "../models/student.model";
import { JobModel } from "../models/job.model";
import { JobinternshipModel } from "../models/jobintership.model";
import { InternshipModel } from "../models/internship.model";

export class jobinternshipdController {
  static async studentjob(req: any, res: any) {
    const student_id = req.body.student_id;
    const job_id = req.body?.job_id;
    const internship_id = req.body?.internship_id;
    const type = req.body.type;
    console.log(
      student_id,
      job_id,
      internship_id,
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    try {
      const studentData = await StudentModel.findOne({
        where: { id: student_id },
      });
      if (!studentData) {
        return res.status(404).json({ error: "Student not found" });
      }
      const jobData = await JobModel.findOne({
        where: { id: job_id },
      });
      if (!jobData) {
        return res.status(404).json({ error: "job not found" });
      }
      const internData = await InternshipModel.findOne({
        where: { id: internship_id },
      });
      const existingLink = await JobinternshipModel.findOne({
        where: { job_id: job_id, student_id: student_id },
      });
      if (!existingLink) {
        const std = await JobinternshipModel.create({
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
      } else if (!existingLink.isApplied) {
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
      } else {
        return res.status(401).json({
          message: "Student already applied for this course",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
