"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internshipController = void 0;
const internship_model_1 = require("../models/internship.model");
class internshipController {
    static async postInternship(req, res) {
        try {
            const internship = await internship_model_1.InternshipModel.create({
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
                    data: internship,
                };
                return res.status(response.status).json(response);
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async AllInternship(req, res) {
        try {
            const all = await internship_model_1.InternshipModel.findAll();
            const response = {
                success: true,
                status: 200,
                data: all,
            };
            return res.status(response.status).json(response);
        }
        catch (error) {
            return res.status(401).json("Error");
        }
    }
}
exports.internshipController = internshipController;
//# sourceMappingURL=internship.controller.js.map