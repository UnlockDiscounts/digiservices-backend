import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema);
