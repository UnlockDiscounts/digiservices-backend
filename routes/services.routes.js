import Router from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/services.controller.js";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({ folder: "services", resource_type: "auto" })
});
const upload = multer({ storage });

router.post("/", upload.array("files", 10), createService);
router.get("/", getServices);
router.get("/:id", getServiceById);
router.put("/:id", upload.array("files", 10), updateService);
router.delete("/:id", deleteService);

export default router;
