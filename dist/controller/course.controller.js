"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseController = void 0;
const course_model_1 = require("../models/course.model");
class courseController {
    static async postCourse(req, res) {
        try {
            const course = await course_model_1.CoursesModel.create({
                title: req.body.title,
                location: req.body.location,
                duration: req.body.duration,
                course_mode: req.body.course_mode,
            });
            const response = {
                success: true,
                status: 200,
                message: "Course Post successfully!",
                data: course,
            };
            return res.status(response.status).json(response.data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async allCourse(req, res) {
        try {
            const data = await course_model_1.CoursesModel.findAll();
            return res.json({ employer: data });
        }
        catch (err) {
            console.log("Error", err);
        }
    }
}
exports.courseController = courseController;
//# sourceMappingURL=course.controller.js.map