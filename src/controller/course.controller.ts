import { CoursesModel } from "../models/course.model";

export class courseController {
  static async postCourse(req: any, res: any) {
    try {
      const course = await CoursesModel.create({
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
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async allCourse(req: any, res: any) {
    try {
      const data = await CoursesModel.findAll();
      return res.json({ employer: data });
    } catch (err) {
      console.log("Error", err);
    }
  }
}
