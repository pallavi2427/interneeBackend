import { CampusController } from "controller/campus.controller";
import { Express } from "express";

export function CampusRoutes(app: Express) {
  app.post("/campus", CampusController.postCampus);
}
