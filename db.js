import mysql from 'mysql2/promise'; // لاحظ إضافة /promise لاستخدام async/await

const db = mysql.createPool({
    host: 'srv1424.hstgr.io',
    user: 'u634390245_shifa',
    password: 'Shifasmile123',
    database: 'u634390245_shifa',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10, // يسمح بـ 10 اتصالات متزامنة
    queueLimit: 0,
    enableKeepAlive: true, // يمنع انقطاع الاتصال عند الخمول
    keepAliveInitialDelay: 10000
});

// اختبار الاتصال الأولي (اختياري للـ Logs)
db.getConnection()
    .then(connection => {
        console.log('تم الاتصال بقاعدة بيانات shifa بنجاح باستخدام Pool ✅');
        connection.release();
    })
    .catch(err => {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err.message);
    });

export default db;

