const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2/promise');
const path = require('path');
const dbConfig = require('./db'); 

const app = express();

// إعداد CORS للسماح بالوصول من موقعك
app.use(cors({
    origin: 'https://shifasmile.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const pool = mysql.createPool(dbConfig);

// مسار المرضى - تم إزالة التحقق من كلمة المرور
app.get('/api/patients', async (req, res) => {
    try {
        // استعلام لجلب كافة المرضى من الجدول
        const [rows] = await pool.query('SELECT * FROM patients'); 
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// مسار الملخص اليومي من الـ View
app.get('/api/daily-summary', async (req, res) => {
    try {
        // استعلام لجلب البيانات من الجدول الافتراضي
        const [rows] = await pool.query('SELECT * FROM daily_summary'); 
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
