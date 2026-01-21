import db from "../db.js";

// إضافة زيارة جديدة
export const addVisit = async (visit) => {
  // تأكد من أن أسماء الأعمدة تطابق جدول visits في phpMyAdmin
  const sql = `INSERT INTO visits 
  (visit_date, file_id, patient_name, procedure_type, doctor, total, paid, payment_method) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    visit.date,
    visit.file_id,
    visit.name,
    visit.proc, // تأكد إذا كان اسم العمود procedure_type أو procedure_name في القاعدة
    visit.doc,
    visit.total,
    visit.paid,
    visit.method
  ];

  try {
    const [result] = await db.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error in addVisit model:", err.message);
    throw err;
  }
};

// جلب الزيارات حسب التاريخ
export const getVisitsByDate = async (date) => {
  try {
    const sql = "SELECT * FROM visits WHERE DATE(visit_date) = ?";
    const [rows] = await db.query(sql, [date]);
    return rows;
  } catch (err) {
    console.error("Error in getVisitsByDate model:", err.message);
    throw err;
  }
};
