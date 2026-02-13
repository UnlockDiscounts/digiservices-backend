import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import blogRouter from './routes/blog.routes.js';
import contactRouter from './routes/contact.route.js';
import servicesRouter from './routes/services.routes.js';
import cardRouter from './routes/card.routes.js';
import testimonialRouter from './routes/testimonial.routes.js';
import faqRouter from './routes/faq.routes.js';
import workRouter from './routes/work.routes.js';
import previewRouter from './routes/preview.routes.js';

dotenv.config();
const app = express();



app.use((req, res, next) => {
  console.log("----- Incoming Request -----");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Origin Header:", req.headers.origin);
  console.log("----------------------------");
  next();
});


const FRONTEND_URL = "https://digi-services-seven.vercel.app";

app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  console.log("CORS Debug → Request Origin:", requestOrigin);

  if (requestOrigin === FRONTEND_URL) {
    console.log("CORS Debug → Origin Matched");

    res.header("Access-Control-Allow-Origin", FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  } else {
    console.log("CORS Debug → Origin NOT matched");
  }

  if (req.method === "OPTIONS") {
    console.log("CORS Debug → Handling Preflight (OPTIONS)");
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  console.log("Health check route hit");
  res.send('Server is running');
});


app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/services', servicesRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/testimonials', testimonialRouter);
app.use('/api/v1/faqs', faqRouter);
app.use('/api/v1/works', workRouter);
app.use('/api/v1/preview', previewRouter);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
