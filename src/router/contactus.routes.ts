import { contactusController } from "../controller/contactus.controller";
import { Express } from "express";
export function ContactusRoutes(app: Express) {
  app.post("/contactus", contactusController.createContact);
  app.get("/allcontact",contactusController.getContacts)
  app.delete("/deletecontact/:id",contactusController.deleteContact)
}
