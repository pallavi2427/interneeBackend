"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internapplyController = void 0;
const sequelize_1 = require("sequelize");
const student_model_1 = require("../models/student.model");
const internship_model_1 = require("../models/internship.model");
const internapply_model_1 = require("../models/internapply.model.");
class internapplyController {
    static async applyIntership(req, res) {
        const student_id = req.body.student_id;
        const internship_id = req.body.internship_id;
        try {
            const studentData = await student_model_1.StudentModel.findOne({
                where: { id: student_id },
            });
            if (!studentData) {
                return res.status(404).json({ error: "Student not found" });
            }
            const internshipData = await internship_model_1.InternshipModel.findOne({
                where: { id: internship_id },
            });
            if (!internshipData) {
                return res.status(404).json({ error: "Internship not found" });
            }
            const existingLink = await internapply_model_1.InternApplyModel.findOne({
                where: { internship_id: internship_id, student_id: student_id },
            });
            if (!existingLink) {
                const std = await internapply_model_1.InternApplyModel.create({
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
            }
            else if (!existingLink.isApplied) {
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
            }
            else {
                return res.status(401).json({
                    message: "Student already applied for this Internship",
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async allstudentInterns(req, res) {
        const { student_id } = req.query;
        try {
            const data3 = await internapply_model_1.InternApplyModel.sequelize.query(`SELECT 
            internapply.id As internshipId, 
            Internship.id,
            internapply.student_id
            FROM students 
            INNER JOIN internapply ON internapply.student_id = students.id 
            INNER JOIN Internship ON Internship.id = internapply.internship_id WHERE internapply.student_id=:student_id`, {
                replacements: { student_id: student_id },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (data3.length === 0) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json({ student: data3 });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
exports.internapplyController = internapplyController;
//# sourceMappingURL=internapply.controller.js.map