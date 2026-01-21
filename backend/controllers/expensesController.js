import db from '../db.js';

// 1. جلب المصروفات حسب التاريخ
export const getExpenses = async (req, res) => {
    try {
        const { date } = req.params; // قراءة التاريخ من الرابط (Params)
        
        const query = "SELECT * FROM expenses WHERE expense_date = ? ORDER BY id DESC";
        
        db.query(query, [date], (err, rows) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).json({ error: "خطأ في الاستعلام من قاعدة البيانات" });
            }
            // إرسال البيانات (حتى لو مصفوفة فارغة) ليتعامل معها React بشكل صحيح
            res.json(rows || []);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. إضافة مصروف جديد
export const addExpense = (req, res) => {
    const { expense_date, item, amount } = req.body;
    
    // تأكد من وجود البيانات الأساسية
    if (!expense_date || !item || !amount) {
        return res.status(400).json({ error: "يرجى تقديم التاريخ، البيان، والمبلغ" });
    }

    const query = `INSERT INTO expenses (expense_date, item, amount) VALUES (?, ?, ?)`;
    
    db.query(query, [expense_date, item, amount], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);
            return res.status(500).json({ error: "فشل في تسجيل المصروف" });
        }
        res.json({ success: true, id: result.insertId });
    });
};

// 3. حذف مصروف
export const deleteExpense = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM expenses WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json({ error: "فشل في حذف المصروف" });
        }
        res.json({ success: true, message: "تم الحذف بنجاح" });
    });
};