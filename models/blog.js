import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    header: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
