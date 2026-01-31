import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    files: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);
