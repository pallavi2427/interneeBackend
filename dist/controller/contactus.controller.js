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
exports.contactusController = void 0;
const contactus_model_1 = require("../models/contactus.model");
class contactusController {
    static createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = yield contactus_model_1.ContactUsModel.create({
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
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    static getContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contacts = yield contactus_model_1.ContactUsModel.findAll();
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
        });
    }
    static deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const deleted = yield contactus_model_1.ContactUsModel.destroy({ where: { id } });
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
exports.contactusController = contactusController;
//# sourceMappingURL=contactus.controller.js.map