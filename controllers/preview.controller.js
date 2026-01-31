import Service from "../models/service.model.js";
import Card from "../models/card.model.js";
import Testimonial from "../models/testimonial.model.js";
import Faq from "../models/faq.model.js";
import Work from "../models/work.model.js";

export const getPreview = async (req, res) => {
  try {
    const [services, cards, testimonials, faqs, works] = await Promise.all([
      Service.find().sort({ createdAt: -1 }),
      Card.find().sort({ createdAt: -1 }),
      Testimonial.find().sort({ createdAt: -1 }),
      Faq.find().sort({ createdAt: -1 }),
      Work.find().sort({ createdAt: -1 })
    ]);

    res.json({ services, cards, testimonials, faqs, works });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
