import { internapplyController } from "../controller/internapply.controller";
import { Express } from "express";

export function internsApplyRoutes(app: Express) {
  app.post("/internshipapply/add", internapplyController.applyIntership);

  app.get("/studentInternship", internapplyController.allstudentInterns);
}
