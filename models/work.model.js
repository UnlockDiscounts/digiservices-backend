import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    title: { type: String },
    description: { type: String },
    files: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);
