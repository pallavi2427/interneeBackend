"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const blog_controller_1 = require("../controller/blog.controller");
function BlogRoutes(app) {
    app.post("/blog", blog_controller_1.blogController.blogPost);
    app.get("/blog/get-all", blog_controller_1.blogController.AllBlog);
}
exports.BlogRoutes = BlogRoutes;
//# sourceMappingURL=blog.routes.js.map