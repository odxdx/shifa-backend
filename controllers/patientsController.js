import db from '../db.js';

// 1. جلب كافة المرضى
export const fetchPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients ORDER BY id DESC");
    res.json(rows); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. إضافة مريض جديد
export const createPatient = async (req, res) => {
  const { file_id, name, phone } = req.body; 
  try {
    // ملاحظة: تأكد أن اسم العمود في القاعدة هو file_id وليس file_number
    await db.query(
      "INSERT INTO patients (file_id, name, phone) VALUES (?, ?, ?)",
      [file_id, name, phone]
    );
    res.status(201).json({ message: "تم إضافة المريض بنجاح" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. حذف مريض (تم تحويلها لـ async/await)
export const deletePatient = async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM patients WHERE id = ?";
    
    try {
        await db.query(sql, [id]);
        res.json({ message: "تم حذف المريض بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. جلب الرقم التالي للملف (Next File ID) - إذا كان تطبيقك يستخدمه
export const fetchNextFileId = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT MAX(file_id) as maxId FROM patients");
        const nextId = (rows[0].maxId || 0) + 1;
        res.json({ nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
