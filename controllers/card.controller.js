import Card from "../models/card.model.js";

export const createCard = async (req, res) => {
  try {
    const { service, sections } = req.body; // sections expected as JSON string or array
    let parsedSections = sections;
    if (typeof sections === "string") {
      try {
        parsedSections = JSON.parse(sections);
      } catch (e) {
        // keep as string if parsing fails
      }
    }

    const card = await Card.create({ service, sections: parsedSections || [] });
    res.status(201).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCards = async (req, res) => {
  const cards = await Card.find().sort({ createdAt: -1 });
  res.json(cards);
};

export const getCardById = async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) return res.status(404).json({ message: "Not found" });
  res.json(card);
};

export const updateCard = async (req, res) => {
  try {
    const { sections } = req.body;
    let parsedSections = sections;
    if (typeof sections === "string") {
      try { parsedSections = JSON.parse(sections); } catch (e) {}
    }
    const updated = await Card.findByIdAndUpdate(req.params.id, { sections: parsedSections }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
