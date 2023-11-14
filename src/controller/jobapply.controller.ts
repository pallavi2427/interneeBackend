import { QueryTypes } from "sequelize";
import { JobApplyModel } from "../models/jobapply.model";
import { StudentModel } from "../models/student.model";
import { JobModel } from "../models/job.model";

export class JobApplyController {
  static async jobApply(req: any, res: any) {
    const student_id = req.body.student_id;
    const job_id = req.body.job_id;

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
        return res.status(404).json({ error: "Job not found" });
      }
      const existingLink = await JobApplyModel.findOne({
        where: { job_id: job_id, student_id: student_id },
      });
      if (!existingLink) {
        const std = await JobApplyModel.create({
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
      } else if (!existingLink.isApplied) {
        existingLink.isApplied = 1;
        const result = await existingLink.save();
        if (result) {
          const response = {
            status: 200,
            message: "Student already applied for this job",
          };
          return res.status(response.status).json(response);
        }
      } else {
        return res.status(401).json({
          message: "Student already applied for this job",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async allstudentJob(req: any, res: any) {
    const { student_id } = req.query;
    try {
      const data3 = await JobApplyModel.sequelize.query(
        `SELECT 
        students.id, 
        job.id,
        jobapply.student_id
        FROM students 
        INNER JOIN jobapply ON students.id = jobapply.student_id 
        INNER JOIN job ON job.id = jobapply.job_id WHERE jobapply.student_id=:student_id`,
        {
          replacements: { student_id: student_id },
          type: QueryTypes.SELECT,
        }
      );
      if (data3.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ student: data3 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
