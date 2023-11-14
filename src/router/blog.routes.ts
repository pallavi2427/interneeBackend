import { blogController } from "../controller/blog.controller";
import { Express } from "express";

export function BlogRoutes(app: Express) {
  app.post("/blog", blogController.blogPost);

  app.get("/blog/get-all", blogController.AllBlog);
}
