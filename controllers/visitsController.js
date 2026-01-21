import db from '../db.js';

// 1. جلب كافة الزيارات لتاريخ معين
export const getAllVisits = async (req, res) => {
    try {
        const { date } = req.query;
        const sql = `SELECT * FROM visits WHERE DATE(visit_date) = ? ORDER BY id DESC`;
        
        const [rows] = await db.query(sql, [date]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. إنشاء زيارة جديدة
export const createVisit = async (req, res) => {
    try {
        const { file_id, patient_name, visit_date, procedure_type, doctor, paid, total, payment_method } = req.body;
        
        // حساب العمولة (40% لدكتور أحمد و 0 لغيره)
        const commission = (doctor === 'د. أحمد عصام') ? (paid * 0.4) : 0;

        const sql = `INSERT INTO visits (file_id, patient_name, visit_date, procedure_type, doctor, paid, total, payment_method, commission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(sql, [
            file_id, 
            patient_name, 
            visit_date, 
            procedure_type, 
            doctor, 
            paid, 
            total, 
            payment_method, 
            commission
        ]);

        res.json({ message: "تمت إضافة الزيارة بنجاح", id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. حذف زيارة
export const deleteVisit = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM visits WHERE id = ?`;
        
        await db.query(sql, [id]);
        res.json({ message: "تم حذف الزيارة بنجاح" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
