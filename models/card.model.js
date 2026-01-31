import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionTitle: { type: String },
  title: { type: String },
  description: { type: String }
});

const cardSchema = new mongoose.Schema(
  {
    // optional relation to a service
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    sections: [sectionSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
