import db from '../db.js';

// 1. جلب كافة المرضى (تغيير الاسم من fetchPatients إلى getPatients)
export const getPatients = async (req, res) => {
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
    await db.query(
      "INSERT INTO patients (file_id, name, phone) VALUES (?, ?, ?)",
      [file_id, name, phone]
    );
    res.status(201).json({ message: "تم إضافة المريض بنجاح" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. حذف مريض
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

// 4. جلب الرقم التالي (تغيير الاسم من fetchNextFileId إلى getNextFileId)
export const getNextFileId = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT MAX(CAST(file_id AS UNSIGNED)) as maxId FROM patients");
        const nextId = (Number(rows[0].maxId) || 0) + 1;
        res.json({ nextId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. تعديل مريض (إضافة الدالة المفقودة لتجنب خطأ الـ Router)
export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, phone, file_id } = req.body;
    try {
        await db.query(
            "UPDATE patients SET name=?, phone=?, file_id=? WHERE id=?", 
            [name, phone, file_id, id]
        );
        res.json({ message: "تم تحديث بيانات المريض بنجاح" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
