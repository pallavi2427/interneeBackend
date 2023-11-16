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
exports.internshipController = void 0;
const internship_model_1 = require("../models/internship.model");
class internshipController {
    static postInternship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const internship = yield internship_model_1.InternshipModel.create({
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
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    static AllInternship(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all = yield internship_model_1.InternshipModel.findAll();
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
        });
    }
}
exports.internshipController = internshipController;
//# sourceMappingURL=internship.controller.js.map