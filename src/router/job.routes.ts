import { JobController } from "../controller/job.controller";
import { Express } from "express";
export function JobRoutes(app: Express) {
  app.post("/job/add", JobController.postJob);
  app.get("/getAllJobs", JobController.getAllJob);
  app.delete("/deleteJob/:id", JobController.delJob);
}
