import db from '../db.js';

// جلب قائمة الأطباء
export const getDoctorsList = async (req, res) => {
    try {
        // استخدام await مباشرة مع الـ Pool الجديد
        const [rows] = await db.query(`SELECT * FROM doctors`);
        res.json(rows);
    } catch (err) {
        // التقاط الأخطاء لمنع توقف السيرفر
        res.status(500).json({ error: err.message });
    }
};
