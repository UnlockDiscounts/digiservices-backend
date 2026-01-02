import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import blogRouter from './routes/blog.routes.js';
import contactRouter from './routes/contact.route.js';
dotenv.config();  
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.send('Server is running');
})

app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/contact', contactRouter);


app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
});