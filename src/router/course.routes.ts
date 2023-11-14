import { courseController } from "../controller/course.controller";
import { Express } from "express";

export function CourseRoutes(app: Express) {
  app.post("/course/add", courseController.postCourse);

  app.get("/course/get-all", courseController.allCourse);
}
