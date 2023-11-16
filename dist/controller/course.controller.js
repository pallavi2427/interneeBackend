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
exports.courseController = void 0;
const course_model_1 = require("../models/course.model");
class courseController {
    static postCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = yield course_model_1.CoursesModel.create({
                    title: req.body.title,
                    location: req.body.location,
                    duration: req.body.duration,
                    course_mode: req.body.course_mode,
                });
                const response = {
                    success: true,
                    status: 200,
                    message: "Course Post successfully!",
                    data: course, // You can include additional data if needed
                };
                return res.status(response.status).json(response.data);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    static allCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield course_model_1.CoursesModel.findAll();
                return res.json({ employer: data });
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
}
exports.courseController = courseController;
//# sourceMappingURL=course.controller.js.map