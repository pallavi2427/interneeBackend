import { InternshipModel } from "../models/internship.model";

export class internshipController {
  static async postInternship(req: any, res: any) {
    try {
      const internship = await InternshipModel.create({
        title: req.body.title,
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
