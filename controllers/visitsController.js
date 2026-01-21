import db from '../db.js';

export const getAllVisits = (req, res) => {
    const { date } = req.query;
    const sql = `SELECT * FROM visits WHERE DATE(visit_date) = ? ORDER BY id DESC`;
    db.query(sql, [date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

export const createVisit = (req, res) => {
    const { file_id, patient_name, visit_date, procedure_type, doctor, paid, total, payment_method } = req.body;
    
    // حساب العمولة تلقائياً (مثلاً 40% لدكتور أحمد و 0 لدكتور فوزي بناءً على صورك)
    const commission = (doctor === 'د. أحمد عصام') ? (paid * 0.4) : 0;

    const sql = `INSERT INTO visits (file_id, patient_name, visit_date, procedure_type, doctor, paid, total, payment_method, commission) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [file_id, patient_name, visit_date, procedure_type, doctor, paid, total, payment_method, commission], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "تمت إضافة الزيارة", id: result.insertId });
    });
};

export const deleteVisit = (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM visits WHERE id = ?`, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "تم حذف الزيارة" });
    });
};