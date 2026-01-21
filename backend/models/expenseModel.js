import db from "../db.js";

// إضافة مصروف
export const addExpense = (item, amount, date) => {
  return new Promise((resolve, reject) => {
    // تأكد أن أسماء الأعمدة هنا تطابق جدولك في phpMyAdmin
    const sql = "INSERT INTO expenses (item, amount, expense_date) VALUES (?, ?, ?)";
    db.query(sql, [item, amount, date], (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

// جلب المصروفات حسب التاريخ
// في ملف الموديل أو السيرفر
export const getExpensesByDate = (date) => {
  return new Promise((resolve, reject) => {
    // استخدمنا expense_date بناءً على قاعدة بياناتك
    db.query("SELECT * FROM expenses WHERE expense_date = ?", [date], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};