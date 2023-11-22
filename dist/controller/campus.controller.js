"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampusController = void 0;
const campus_model_1 = require("models/campus.model");
class CampusController {
    static async postCampus(req, res) {
        try {
            console.log(req, ">>>>>>>>>>>");
            const { first_name, email } = req.body;
            if (!first_name || !email) {
                return res
                    .status(400)
                    .json({ success: false, message: "Missing required fields." });
            }
            const date = req.body.date ? new Date(req.body.date) : null;
            const campus = await campus_model_1.CampusModel.create({
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
        }
        catch (error) {
            console.error("Error creating campus:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal server error." });
        }
    }
}
exports.CampusController = CampusController;
//# sourceMappingURL=campus.controller.js.map