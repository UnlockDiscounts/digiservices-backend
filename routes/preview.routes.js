import Router from "express";
import { getPreview } from "../controllers/preview.controller.js";

const router = Router();

router.get("/", getPreview);

export default router;