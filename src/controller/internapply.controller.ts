import { QueryTypes } from "sequelize";
import { StudentModel } from "../models/student.model";
import { InternshipModel } from "../models/internship.model";
import { InternApplyModel } from "../models/internapply.model.";

export class internapplyController {
  static async applyIntership(req: any, res: any) {
    const student_id = req.body.student_id;
    const internship_id = req.body.internship_id;

    try {
      const studentData = await StudentModel.findOne({
        where: { id: student_id },
      });
      if (!studentData) {
        return res.status(404).json({ error: "Student not found" });
      }
      const internshipData = await InternshipModel.findOne({
        where: { id: internship_id },
      });
      if (!internshipData) {
        return res.status(404).json({ error: "Internship not found" });
      }
      const existingLink = await InternApplyModel.findOne({
        where: { internship_id: internship_id, student_id: student_id },
      });
      if (!existingLink) {
        const std = await InternApplyModel.create({
          internship_id: internship_id,
          student_id: student_id,
          isApplied: 1,
        });
        const result = await std.save();
        if (result) {
          const response = {
            success: true,
            status: 200,
            message: "Internship Apply Successfully!",
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
            message: "Student already applied for this Internship",
          };
          return res.status(response.status).json(response);
        }
      } else {
        return res.status(401).json({
          message: "Student already applied for this Internship",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async allstudentInterns(req: any, res: any) {
    const { student_id } = req.query;
    try {
      const data3 = await InternApplyModel.sequelize.query(
        `SELECT 
            students.id, 
            Internship.id,
            Internship.title,
            internapply.student_id
            FROM students 
            INNER JOIN internapply ON students.id = internapply.student_id 
            INNER JOIN Internship ON Internship.id = internapply.id WHERE internapply.student_id=:student_id`,
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
