import { coursestdController } from "../controller/coursestd.controller";
import { Express } from "express";
import { jobinternshipdController } from "../controller/jobinternship.controller";

export function JobInternshipRoutes(app: Express) {
  app.post("/studentjob/apply", jobinternshipdController.studentjob);
  //   app.get("/studentCourse", coursestdController.allstudentCourse);
}
