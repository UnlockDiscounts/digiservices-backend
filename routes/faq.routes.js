import Router from "express";
import {
  createFaq,
  getFaqs,
  updateFaq,
  deleteFaq
} from "../controllers/faq.controller.js";

const router = Router();

router.post("/", createFaq);
router.get("/", getFaqs);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;
