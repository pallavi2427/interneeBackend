"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactusController = void 0;
const contactus_model_1 = require("../models/contactus.model");
class contactusController {
    static async createContact(req, res) {
        try {
            const newContact = await contactus_model_1.ContactUsModel.create({
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
                    data: newContact,
                };
                return res.status(response.status).json(response);
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async getContacts(req, res) {
        try {
            let contacts = await contactus_model_1.ContactUsModel.findAll();
            const response = {
                success: true,
                status: 200,
                message: "successfully fetched all the inquiries",
                data: { contacts },
            };
            return res.status(response.status).json(response);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async deleteContact(req, res) {
        try {
            const id = req.params.id;
            const deleted = await contactus_model_1.ContactUsModel.destroy({ where: { id } });
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
exports.contactusController = contactusController;
//# sourceMappingURL=contactus.controller.js.map