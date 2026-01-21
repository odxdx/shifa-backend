import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'u634390245_shifa',
    password: 'Shifasmile123', // اتركها فارغة إذا لم تكن قد وضعت كلمة سر لـ XAMPP
    database: 'u634390245_shifa'
});

db.connect((err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('تم الاتصال بقاعدة بيانات shifa بنجاح ✅');
});

export default db;