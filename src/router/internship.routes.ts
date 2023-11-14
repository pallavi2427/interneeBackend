import { internshipController } from "../controller/internship.controller";
import { Express } from "express";

export function InternRoutes(app: Express) {
  app.post("/internship", internshipController.postInternship);
  app.get("/allInternship", internshipController.AllInternship);
}
