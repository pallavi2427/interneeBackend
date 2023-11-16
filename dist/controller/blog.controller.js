"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const blog_model_1 = require("../models/blog.model");
const multer_1 = require("../utils/multer");
class blogController {
    static blogPost(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                multer_1.uploadFile;
                const files = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                const blog = yield blog_model_1.BlogModel.create({
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
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    static AllBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield blog_model_1.BlogModel.findAll();
                return res.json({ blogs: data });
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
}
exports.blogController = blogController;
//# sourceMappingURL=blog.controller.js.map