import { ContactUsModel } from "../models/contactus.model";

export class contactusController {
  static async createContact(req: any, res: any) {
    try {
      const newContact = await ContactUsModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        comment: req.body.comment,
      });
      const result = newContact.save();
      if (result) {
        const response = {
          success: true,
          status: 200,
          message: "send inquiry successfully!",
          data: newContact, // You can include additional data if needed
        };
        return res.status(response.status).json(response);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async getContacts(req: any, res: any) {
    try {
      let contacts = await ContactUsModel.findAll();
      const response = {
        success: true,
        status: 200,
        message: "successfully fetched all the inquiries",
        data: { contacts },
      };
      return res.status(response.status).json(response);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async deleteContact(req: any, res: any) {
    try {
      const id = req.params.id;
      const deleted = await ContactUsModel.destroy({ where: { id } });
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
