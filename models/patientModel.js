import db from "../db.js";

// جلب جميع المرضى
export const getPatients = (req, res) => {
    db.query("SELECT * FROM patients ORDER BY CAST(file_id AS UNSIGNED) DESC", (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
};

// دالة جلب الرقم التالي (المفقودة التي تسببت بالخطأ)
export const getNextFileId = (req, res) => {
    db.query("SELECT MAX(CAST(file_id AS UNSIGNED)) as lastId FROM patients", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const nextId = (results[0].lastId || 0) + 1;
        res.json({ nextId });
    });
};

// إضافة مريض
export const createPatient = (req, res) => {
    const { file_id, name, phone } = req.body;
    db.query("INSERT INTO patients (file_id, name, phone) VALUES (?,?,?)", 
    [file_id, name, phone], (err, result) => {
        if (err) return res.status(500).json({ error: "رقم الملف موجود مسبقاً" });
        res.json({ message: "تمت الإضافة", id: result.insertId });
    });
};

// تعديل مريض
export const updatePatient = (req, res) => {
    const { id } = req.params;
    const { name, phone, file_id } = req.body;
    db.query("UPDATE patients SET name=?, phone=?, file_id=? WHERE id=?", 
    [name, phone, file_id, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "تم التحديث" });
    });
};