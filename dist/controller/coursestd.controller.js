"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursestdController = void 0;
const sequelize_1 = require("sequelize");
const student_model_1 = require("../models/student.model");
const course_model_1 = require("../models/course.model");
const coursestd_model_1 = require("../models/coursestd.model");
class coursestdController {
    static async studentCourse(req, res) {
        const student_id = req.body.student_id;
        const course_id = req.body.course_id;
        try {
            const studentData = await student_model_1.StudentModel.findOne({
                where: { id: student_id },
            });
            if (!studentData) {
                return res.status(404).json({ error: "Student not found" });
            }
            const courseData = await course_model_1.CoursesModel.findOne({
                where: { course_id: course_id },
            });
            if (!courseData) {
                return res.status(404).json({ error: "Course not found" });
            }
            const existingLink = await coursestd_model_1.CoursestdModel.findOne({
                where: { course_id: course_id, student_id: student_id },
            });
            if (!existingLink) {
                const std = await coursestd_model_1.CoursestdModel.create({
                    course_id: course_id,
                    student_id: student_id,
                    isApplied: 1,
                });
                const result = await std.save();
                if (result) {
                    const response = {
                        success: true,
                        status: 200,
                        message: "Course added successfully!",
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
                        message: "Student already applied for this course",
                    };
                    return res.status(response.status).json(response);
                }
            }
            else {
                return res.status(401).json({
                    message: "Student already applied for this course",
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    static async allstudentCourse(req, res) {
        const { student_id } = req.query;
        try {
            const data3 = await coursestd_model_1.CoursestdModel.sequelize.query(`SELECT 
        coursestd.id AS courseId,
        course.course_id,
        coursestd.student_id
        FROM students 
        INNER JOIN coursestd ON coursestd.student_id = students.id
        INNER JOIN course ON course.course_id = coursestd.course_id WHERE coursestd.student_id=:student_id`, {
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
exports.coursestdController = coursestdController;
//# sourceMappingURL=coursestd.controller.js.map