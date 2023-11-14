import { coursestdController } from "../controller/coursestd.controller";
import { Express } from "express";

export function CoursestdRoutes(app: Express) {
  app.post("/studentCourse/add", coursestdController.studentCourse);

  app.get("/studentCourse", coursestdController.allstudentCourse);
}
