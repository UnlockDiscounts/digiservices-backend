import Contact from "../models/contact.model.js";

// CREATE CONTACT MESSAGE
export const createContactMessage = async (req, res) => {
  try {
    const { fullname, companyName, email, contactNumber, message } = req.body;

    if (!fullname || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const contactMessage = await Contact.create({
      fullname,
      companyName,
      email,
      contactNumber,
      message
    });

    res.status(201).json(contactMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// GET ALL CONTACT MESSAGES
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// DELETE CONTACT MESSAGE
export const deleteContactMessage = async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }   
};
