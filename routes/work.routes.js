import Router from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  createWork,
  getWorks,
  getWorkById,
  updateWork,
  deleteWork
} from "../controllers/work.controller.js";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({ folder: "work_examples", resource_type: "auto" })
});
const upload = multer({ storage });

router.post("/", upload.array("files", 20), createWork);
router.get("/", getWorks);
router.get("/:id", getWorkById);
router.put("/:id", upload.array("files", 20), updateWork);
router.delete("/:id", deleteWork);

export default router;