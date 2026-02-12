import Service from "../models/service.model.js";


export const createService = async (req, res) => {
  try {
    const { category, title, description, isActive } = req.body;

    const files = req.files ? req.files.map(file => file.path) : [];

    const service = await Service.create({
      category,
      title,
      description,
      files,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json(service);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




export const getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};


export const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Not found" });
  res.json(service);
};


export const updateService = async (req, res) => {
  try {
    const { category, title, description, isActive } = req.body;
    const files = req.files?.map(f => f.path) || [];

    const update = { category, title, description };

    if (typeof isActive !== "undefined") {
      update.isActive = isActive;
    }

    if (files.length) {
      update.files = files;
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
