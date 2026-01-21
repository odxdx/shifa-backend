import express from 'express';
import cors from 'cors';
import router from './routes/appRouter.js';

const app = express();

// يجب أن يكون CORS قبل أي شيء آخر
app.use(cors({
    origin: ['https://shifasmile.com', 'http://shifasmile.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// المسارات
app.use('/api', router);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
