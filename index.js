import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Route Imports
import blogRouter from "./routes/blog.routes.js";
import contactRouter from "./routes/contact.route.js";
import servicesRouter from "./routes/services.routes.js";
import cardRouter from "./routes/card.routes.js";
import testimonialRouter from "./routes/testimonial.routes.js";
import faqRouter from "./routes/faq.routes.js";
import workRouter from "./routes/work.routes.js";
import previewRouter from "./routes/preview.routes.js";

dotenv.config();

const app = express();

// 1. CORS - ALLOW EVERYTHING
// This handles all origins, methods, and the OPTIONS preflight automatically
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. LOGGING MIDDLEWARE (For Debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to: ${req.originalUrl}`);
  next();
});

// 3. BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. HEALTH CHECK ROUTE
app.get("/", (req, res) => {
  res.send("Server is running and CORS is wide open.");
});

// 5. API ROUTES
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/cards", cardRouter);
app.use("/api/v1/testimonials", testimonialRouter);
app.use("/api/v1/faqs", faqRouter);
app.use("/api/v1/works", workRouter);
app.use("/api/v1/preview", previewRouter);

// 6. START SERVER
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
