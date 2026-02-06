import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    name: { type: String, required: true },
    description: { type: String },
    file: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
