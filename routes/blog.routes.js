import Router from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from "../controllers/blog.controller.js";

const blogRouter = Router();


// CLOUDINARY STORAGE
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "blog_posts",
    resource_type: "auto"
  }),
});

const upload = multer({ storage });


// ROUTES
blogRouter.post("/", upload.array("images", 10), createPost);
blogRouter.get("/", getPosts);
blogRouter.get("/:id", getPostById);
blogRouter.put("/:id", upload.array("images", 10), updatePost);
blogRouter.delete("/:id", deletePost);


export default blogRouter;
