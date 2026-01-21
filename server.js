const express = require('express');
const cors = require('cors'); // تعريف واحد فقط هنا
const mysql = require('mysql2/promise');
const path = require('path');
const dbConfig = require('./db'); // تأكد أن db.js يحتوي على بيانات Hostinger

const app = express();

// إعداد CORS بشكل صحيح للسماح لموقعك بالوصول
app.use(cors({
    origin: 'https://shifasmile.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-password']
}));

app.use(express.json());

// الاتصال بقاعدة البيانات
const pool = mysql.createPool(dbConfig);

// مثال لمسار المرضى مع التحقق من كلمة المرور (بناءً على الصورة الأخيرة)
app.get('/api/patients', async (req, res) => {
    const adminPassword = req.headers['x-admin-password'];
    if (adminPassword !== 'Shi159357fa') {
        return res.status(403).json({ error: "Access Denied: Wrong Password" }); //
    }
    try {
        const [rows] = await pool.query('SELECT * FROM patients'); //
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// مسار لجلب الملخص اليومي من الـ View التي أنشأناها
app.get('/api/daily-summary', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM daily_summary'); //
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
