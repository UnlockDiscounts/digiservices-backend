import Work from "../models/work.model.js";

export const createWork = async (req, res) => {
  try {
    const { title, description, service } = req.body;
    const files = req.files?.map(f => f.path) || [];
    const work = await Work.create({ title, description, files, service });
    res.status(201).json(work);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWorks = async (req, res) => {
  const items = await Work.find().sort({ createdAt: -1 });
  res.json(items);
};

export const getWorkById = async (req, res) => {
  const item = await Work.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

export const updateWork = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files?.map(f => f.path) || [];
    const update = { title, description };
    if (files.length) update.files = files;
    const updated = await Work.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteWork = async (req, res) => {
  try {
    const deleted = await Work.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
