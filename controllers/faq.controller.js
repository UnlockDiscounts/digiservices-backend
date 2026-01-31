import Faq from "../models/faq.model.js";

export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await Faq.create({ question, answer });
    res.status(201).json(faq);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFaqs = async (req, res) => {
  const items = await Faq.find().sort({ createdAt: -1 });
  res.json(items);
};

export const updateFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updated = await Faq.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFaq = async (req, res) => {
  try {
    const deleted = await Faq.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
