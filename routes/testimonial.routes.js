import Router from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonial.controller.js";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({ folder: "testimonials", resource_type: "auto" })
});
const upload = multer({ storage });

router.post("/", upload.single("file"), createTestimonial);
router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.put("/:id", upload.single("file"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;
