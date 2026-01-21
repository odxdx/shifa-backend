import db from "../db.js";

// جلب جميع المرضى
export const getPatients = async (req, res) => {
    try {
        // استخدام CAST للتأكد من ترتيب الأرقام بشكل صحيح (1, 2, 10 بدلاً من 1, 10, 2)
        const [rows] = await db.query("SELECT * FROM patients ORDER BY CAST(file_id AS UNSIGNED) DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب الرقم التالي للملف
export const getNextFileId = async (req, res) => {
    try {
        const [results] = await db.query("SELECT MAX(CAST(file_id AS UNSIGNED)) as lastId FROM patients");
        const nextId = (results[0].lastId || 0) + 1;
        res.json({ nextId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// إضافة مريض
export const createPatient = async (req, res) => {
    const { file_id, name, phone } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO patients (file_id, name, phone) VALUES (?,?,?)", 
            [file_id, name, phone]
        );
        res.json({ message: "تمت إضافة المريض بنجاح", id: result.insertId });
    } catch (err) {
        // التحقق من تكرار رقم الملف
        const errorMsg = err.code === 'ER_DUP_ENTRY' ? "رقم الملف موجود مسبقاً" : err.message;
        res.status(500).json({ error: errorMsg });
    }
};

// تعديل مريض
export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, phone, file_id } = req.body;
    try {
        await db.query(
            "UPDATE patients SET name=?, phone=?, file_id=? WHERE id=?", 
            [name, phone, file_id, id]
        );
        res.json({ message: "تم تحديث بيانات المريض بنجاح" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
