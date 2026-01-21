import db from "../db.js";

// إضافة مصروف
export const addExpense = async (item, amount, date) => {
    try {
        const sql = "INSERT INTO expenses (item, amount, expense_date) VALUES (?, ?, ?)";
        // مكتبة mysql2/promise تعيد مصفوفة [النتائج, الحقول]
        const [result] = await db.query(sql, [item, amount, date]);
        return result;
    } catch (err) {
        console.error("Error in addExpense model:", err.message);
        throw err; // تمرير الخطأ ليتم التعامل معه في الـ Controller
    }
};

// جلب المصروفات حسب التاريخ
export const getExpensesByDate = async (date) => {
    try {
        const sql = "SELECT * FROM expenses WHERE expense_date = ?";
        const [rows] = await db.query(sql, [date]);
        return rows;
    } catch (err) {
        console.error("Error in getExpensesByDate model:", err.message);
        throw err;
    }
};
