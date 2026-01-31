import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    file: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
