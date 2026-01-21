import express from 'express';
import cors from 'cors';
import router from './routes/appRouter.js';

const app = express();
// 1. يفضل دائماً وضع كلمة المرور في متغير بيئة (Environment Variable)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Shi159357fa';

// 2. تحديث إعدادات CORS للسماح لموقعك فقط بالوصول للبيانات
app.use(cors({
    origin: 'https://shifasmile.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-password']
}));

app.use(express.json());

// --- وظيفة الحماية (Auth Middleware) ---
const checkAuth = (req, res, next) => {
    const userPass = req.headers['x-admin-password'];
    
    if (userPass === ADMIN_PASSWORD) {
        next();
    } else {
        console.warn(`محاولة وصول غير مصرح بها من: ${req.ip}`);
        res.status(401).json({ error: "Access Denied: Wrong Password" });
    }
};

// تطبيق الحماية
app.use('/api', checkAuth, router);

// 3. تغيير المنفذ (Port) ليتناسب مع إعدادات الاستضافة
// الاستضافات غالباً ما تحدد المنفذ تلقائياً عبر process.env.PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`السيرfer يعمل بنجاح 🚀`);

});
