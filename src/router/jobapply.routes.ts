import { JobApplyController } from "../controller/jobapply.controller";
import { Express } from "express";

export function JobApplyRoutes(app: Express) {
  //Apply student for job//
  app.post("/applyjob/add", JobApplyController.jobApply);

  // get student who apply for job//
  app.get("/studentJob", JobApplyController.allstudentJob);
}
