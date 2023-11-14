import { BlogModel } from "../models/blog.model";
import { uploadFile } from "../utils/multer";

export class blogController {
  static async blogPost(req: any, res: any) {
    try {
      uploadFile;
      const files = req.file?.filename;
      const blog = await BlogModel.create({
        title: req.body.title,
        content: req.body.content,
        image: files,
      });
      const result = blog.save();
      if (result) {
        const response = {
          success: true,
          status: 200,
          message: "Blog Post successfully!",
          blog: blog, // You can include additional data if needed
        };
        return res.status(response.status).json(response);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async AllBlog(req: any, res: any) {
    try {
      const data = await BlogModel.findAll();
      return res.json({ blogs: data });
    } catch (err) {
      console.log("Error", err);
    }
  }
}
