import { QueryTypes } from "sequelize";
import { InternshipModel } from "../models/internship.model";

export class internshipController {
  static async postInternship(req: any, res: any) {
    try {
      const internship = await InternshipModel.create({
        title: req.body.title,
        emp_id: req.body.emp_id,
        admin_id: req.body.admin_id,
        company_name: req.body.company_name,
        location: req.body.location,
        duration: req.body.duration,
        stipend_mode: req.body.stipend_mode,
        amount: req.body.amount,
        postBy: req.body.postBy,
      });
      const result = internship.save();
      if (result) {
        const response = {
          success: true,
          status: 200,
          message: "Internship post successfully!",
          data: internship, // You can include additional data if needed
        };
        return res.status(response.status).json(response);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async getById(req: any, res: any) {
    const { emp_id } = req.query;
    try {
      const empdata = await InternshipModel.sequelize.query(
        `SELECT
        internship.id As internId,
        internship.company_name,
        internship.title,
        internship.location,
        internship.duration,
        internship.stipend_mode,
        internship.postBy,
      employer.id AS employerId,
      internship.emp_id AS internshipId
      FROM employer
      INNER JOIN internship ON employer.id = internship.emp_id WHERE internship.emp_id=:emp_id`,
        {
          replacements: { emp_id: emp_id },
          type: QueryTypes.SELECT,
        }
      );
      if (empdata.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ employer: empdata });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async AllInternship(req: any, res: any) {
    try {
      const all = await InternshipModel.findAll();
      const response = {
        success: true,
        status: 200,
        data: all,
      };
      return res.status(response.status).json(response);
    } catch (error) {
      return res.status(401).json("Error");
    }
  }
}
