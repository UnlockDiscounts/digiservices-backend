import Testimonial from "../models/testimonial.model.js";

export const createTestimonial = async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file?.path;
    const testimonial = await Testimonial.create({ name, description, file });
    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTestimonials = async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  res.json(items);
};

export const getTestimonialById = async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const updateTestimonial = async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file?.path;
    const update = { name, description };
    if (file) update.file = file;
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
