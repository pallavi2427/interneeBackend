"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactusRoutes = void 0;
const contactus_controller_1 = require("../controller/contactus.controller");
function ContactusRoutes(app) {
    app.post("/contactus", contactus_controller_1.contactusController.createContact);
    app.get("/allcontact", contactus_controller_1.contactusController.getContacts);
    app.delete("/deletecontact/:id", contactus_controller_1.contactusController.deleteContact);
}
exports.ContactusRoutes = ContactusRoutes;
//# sourceMappingURL=contactus.routes.js.map