"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_model_1 = require("../models/blog.model");
const multer_1 = require("../utils/multer");
class blogController {
    static async blogPost(req, res) {
        var _a;
        try {
            multer_1.uploadFile;
            const files = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const blog = await blog_model_1.BlogModel.create({
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
                    blog: blog,
                };
                return res.status(response.status).json(response);
            }
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
    static async AllBlog(req, res) {
        try {
            const data = await blog_model_1.BlogModel.findAll();
            return res.json({ blogs: data });
        }
        catch (err) {
            console.log("Error", err);
        }
    }
}
exports.blogController = blogController;
//# sourceMappingURL=blog.controller.js.map