import db from '../db.js';

// جلب الملخص اليومي
export const getDailySummary = async (req, res) => {
    const { date } = req.query;

    // 1. استعلام لجلب الملخص العام (الدخل والمصروفات)
    const summarySql = `SELECT income, expenses, net FROM daily_summary WHERE report_date = ?`;
    
    // 2. استعلام لحساب مجموع عمولات د. أحمد عصام لهذا اليوم تحديداً
    const ahmedSql = `SELECT SUM(commission) as total_ahmed FROM visits WHERE doctor LIKE '%أحمد%' AND visit_date = ?`;

    try {
        const [summaryRows] = await db.query(summarySql, [date]);
        const [ahmedRows] = await db.query(ahmedSql, [date]);

        const mainStats = summaryRows[0] || { income: 0, expenses: 0, net: 0 };
        const ahmedCommission = ahmedRows[0].total_ahmed || 0;

        res.json({
            income: mainStats.income,
            expenses: mainStats.expenses,
            ahmed: ahmedCommission, // هنا سيظهر الـ 600 المحسوبة في جدول الزيارات
            net: mainStats.net
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب الملخص الشهري
export const getMonthlySummary = async (req, res) => {
    const { month, year } = req.query;

    const statsSql = `SELECT * FROM monthly_finance_summary WHERE report_year = ? AND report_month = ?`;
    const doctorsSql = `
        SELECT doctor as doctor_name, COUNT(id) as visit_count, SUM(paid) as total_income  
        FROM visits  
        WHERE MONTH(visit_date) = ? AND YEAR(visit_date) = ?  
        GROUP BY doctor`;
    const expensesSql = `SELECT * FROM expenses WHERE MONTH(expense_date) = ? AND YEAR(expense_date) = ? ORDER BY expense_date DESC`;

    try {
        // تنفيذ جميع الاستعلامات بالتوازي لسرعة الأداء
        const [statsRows] = await db.query(statsSql, [year, month]);
        const [doctorsRows] = await db.query(doctorsSql, [month, year]);
        const [expensesRows] = await db.query(expensesSql, [month, year]);

        const mainStats = statsRows[0] || { total_income: 0, total_expenses: 0, net_profit: 0 };

        res.json({
            stats: {
                income: mainStats.total_income,
                expenses: mainStats.total_expenses,
                net: mainStats.net_profit
            },
            doctors: doctorsRows || [],
            expenses: expensesRows || []
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب إحصائيات الأطباء لفترة محددة
export const getDoctorStats = async (req, res) => {
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

    try {
        const [rows] = await db.query(sql, [start, end]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// جلب الملخص الأسبوعي
export const getWeeklySummary = async (req, res) => {
    const { year } = req.query;
    const sql = `SELECT * FROM weekly_finance_summary WHERE report_year = ? ORDER BY week_number DESC`;

    try {
        const [rows] = await db.query(sql, [year]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

