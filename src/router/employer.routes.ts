import { employerController } from "../controller/employer.controller";
import { Express } from "express";
import val from "../utils/validations";

export function EmployerRoutes(app: Express) {
  app.post("/employer/register", val("register"), employerController.register);
  app.post("/employer/login", val("login"), employerController.login);
  app.get("/employer-alldata", employerController.employerData);
  app.get("/verifyEmail", employerController.verifyEmail);
  app.get("/rejectEmail", employerController.rejectEmail);
  app.put("/employer/profile/:id", employerController.profile);
}
