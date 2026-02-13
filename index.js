import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

app.use(cors({
  origin: "https://digi-services-seven.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
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
    console.error(error);
    process.exit(1);
  }
};

startServer();
