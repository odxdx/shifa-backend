import express from 'express';
import cors from 'cors';
import router from './routes/appRouter.js';

const app = express();

// 1. تحديث إعدادات CORS للسماح لموقعك بالوصول
app.use(cors({
    origin: 'https://shifasmile.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'] // تم إزالة x-admin-password من هنا
}));

app.use(express.json());

// 2. تم إزالة وظيفة الحماية (checkAuth) لفتح الوصول المباشر
// تم ربط الراوتر مباشرة بـ /api بدون middleware الحماية
app.use('/api', router);

// 3. إعداد المنفذ ليتناسب مع Railway
const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`السيرفر يعمل بنجاح وبدون كلمة مرور 🚀`);
});
