import db from '../db.js';

// 1. جلب المصروفات حسب التاريخ
export const getExpenses = async (req, res) => {
    try {
        const { date } = req.params; 
        const query = "SELECT * FROM expenses WHERE expense_date = ? ORDER BY id DESC";
        
        // استخدام await مباشرة مع الـ Pool
        const [rows] = await db.query(query, [date]);
        
        res.json(rows || []);
    } catch (error) {
        console.error("DB Error:", error.message);
        res.status(500).json({ error: "خطأ في الاستعلام من قاعدة البيانات" });
    }
};

// 2. إضافة مصروف جديد
export const addExpense = async (req, res) => {
    try {
        const { expense_date, item, amount } = req.body;
        
        if (!expense_date || !item || !amount) {
            return res.status(400).json({ error: "يرجى تقديم التاريخ، البيان، والمبلغ" });
        }

        const query = `INSERT INTO expenses (expense_date, item, amount) VALUES (?, ?, ?)`;
        
        const [result] = await db.query(query, [expense_date, item, amount]);
        
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error("Insert Error:", error.message);
        res.status(500).json({ error: "فشل في تسجيل المصروف" });
    }
};

// 3. حذف مصروف
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM expenses WHERE id = ?";
        
        await db.query(query, [id]);
        
        res.json({ success: true, message: "تم الحذف بنجاح" });
    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ error: "فشل في حذف المصروف" });
    }
};
