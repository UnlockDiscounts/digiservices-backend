import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    files: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
