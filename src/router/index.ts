import { Express, Request, Response } from "express";
import { StudentRoutes } from "./student.routes";
import { EmployerRoutes } from "./employer.routes";
import { BlogRoutes } from "./blog.routes";
import { InternRoutes } from "./internship.routes";
import { CourseRoutes } from "./course.routes";
import { JobRoutes } from "./job.routes";
import { CoursestdRoutes } from "./coursestd.routes";
import { JobApplyRoutes } from "./jobapply.routes";
import { internsApplyRoutes } from "./internapply.routes";
import { JobInternshipRoutes } from "./jobinternship.routes";
import { ContactusRoutes } from "./contactus.routes";
import { CampusRoutes } from "./campus.routes";

export function initRoutes(app: Express) {
  app.get("/api", (req: Request, res: Response) =>
    res.status(200).send({
      message: "server is listening!",
    })
  );

  StudentRoutes(app);
  EmployerRoutes(app);
  BlogRoutes(app);
  InternRoutes(app);
  CourseRoutes(app);
  JobRoutes(app);
  CoursestdRoutes(app);
  JobApplyRoutes(app);
  internsApplyRoutes(app);
  JobInternshipRoutes(app);
  ContactusRoutes(app);
  CampusRoutes(app);
  app.all("*", (req: Request, res: Response) => res.status(404).send());
}
