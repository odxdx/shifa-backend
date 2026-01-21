import db from '../db.js';

// جلب الملخص اليومي (من الـ View الحالي)
export const getDailySummary = (req, res) => {
    const { date } = req.query;
    const sql = `SELECT * FROM daily_summary WHERE report_date = ?`;

    db.query(sql, [date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results.length > 0 ? results[0] : { income: 0, expenses: 0, ahmed: 0, net: 0 });
    });
};

// جلب الملخص الشهري (باستخدام الـ View الجديد المالي فقط)
export const getMonthlySummary = (req, res) => {
    const { month, year } = req.query;

    // استعلامات منفصلة لضمان عدم تداخل البيانات
    const statsSql = `SELECT * FROM monthly_finance_summary WHERE report_year = ? AND report_month = ?`;
    const doctorsSql = `
        SELECT doctor as doctor_name, COUNT(id) as visit_count, SUM(paid) as total_income 
        FROM visits 
        WHERE MONTH(visit_date) = ? AND YEAR(visit_date) = ? 
        GROUP BY doctor`;
    const expensesSql = `SELECT * FROM expenses WHERE MONTH(expense_date) = ? AND YEAR(expense_date) = ? ORDER BY expense_date DESC`;

    db.query(statsSql, [year, month], (err, statsResults) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query(doctorsSql, [month, year], (err, doctorsResults) => {
            db.query(expensesSql, [month, year], (err, expensesResults) => {
                
                // البيانات المالية من الـ View
                const mainStats = statsResults[0] || { total_income: 0, total_expenses: 0, net_profit: 0 };

                res.json({
                    stats: {
                        income: mainStats.total_income,
                        expenses: mainStats.total_expenses,
                        net: mainStats.net_profit
                    },
                    doctors: doctorsResults || [],
                    expenses: expensesResults || []
                    // ملاحظة: تم إزالة المرضى الجدد بناءً على طلبك الأخير
                });
            });
        });
    });
};

// جلب إحصائيات الأطباء لفترة محددة
export const getDoctorStats = (req, res) => {
    const { start, end } = req.query;
    const sql = `
        SELECT 
            doctor, 
            COUNT(id) as cases, 
            SUM(paid) as total_paid,
            SUM(commission) as doctor_earnings
        FROM visits 
        WHERE DATE(visit_date) BETWEEN ? AND ? 
        GROUP BY doctor`;

    db.query(sql, [start, end], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
export const getWeeklySummary = (req, res) => {
    const { year } = req.query;
    const sql = `SELECT * FROM weekly_finance_summary WHERE report_year = ? ORDER BY week_number DESC`;

    db.query(sql, [year], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};