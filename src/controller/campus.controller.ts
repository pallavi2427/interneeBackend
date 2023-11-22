import { CampusModel } from "models/campus.model";

export class CampusController {

  static async postCampus(req: any, res: any) {
    try {
      console.log(req,">>>>>>>>>>>");
      // Input validation
      const { first_name, email /* ... other fields */ } = req.body;
      if (!first_name || !email /* ... other required fields */) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields." });
      }

      // Handling date field
      const date = req.body.date ? new Date(req.body.date) : null;

      const campus = await CampusModel.create({
        first_name,
        last_name: req.body.last_name,
        email,
        contact_number: req.body.contact_number,
        designation: req.body.designation,
        inquiry_for: req.body.inquiry_for,
        message: req.body.message,
        date,
      });
      console.log(req, ">>>>>>>>>>>>>>");

      const response = {
        success: true,
        status: 200,
        message: "Campus post successful!",
        data: campus,
      };
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error creating campus:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
}

