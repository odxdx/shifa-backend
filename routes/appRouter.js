import express from 'express';
// استيراد جميع المتحكمات
import * as patientCtrl from '../controllers/patientsController.js';
import * as dash from '../controllers/dashboardController.js';
import * as visit from '../controllers/visitsController.js';
import * as exp from '../controllers/expensesController.js';

const router = express.Router();

// مصفوفة للفحص السريع في سجلات Railway إذا كانت الدالة مفقودة
console.log('Checking Controllers:', {
    getPatients: typeof patientCtrl.getPatients,
    getDailySummary: typeof dash.getDailySummary,
    getAllVisits: typeof visit.getAllVisits
});

// --- مسارات المرضى (Patients) ---
router.get('/patients', patientCtrl.getPatients); 
router.get('/patients/next-id', patientCtrl.getNextFileId); // تأكد من الاسم داخل patientsController
router.post('/patients', patientCtrl.createPatient);
router.put('/patients/:id', patientCtrl.updatePatient);

// --- مسارات الزيارات (Visits) ---
router.get('/visits', visit.getAllVisits); // تأكد أن الاسم في الملف هو getAllVisits
router.post('/visits', visit.createVisit);
router.put('/visits/:id', visit.updateVisit);
router.delete('/visits/:id', visit.deleteVisit);

// --- مسارات المصروفات (Expenses) ---
router.get('/expenses/:date', exp.getExpenses); 
router.post('/expenses', exp.addExpense);
router.put('/expenses/:id', exp.updateExpense); // إضافة هذا السطر
router.delete('/expenses/:id', exp.deleteExpense);

// --- مسارات لوحة التحكم (Dashboard) ---
router.get('/daily-summary', dash.getDailySummary);
router.get('/monthly-summary', dash.getMonthlySummary);
router.get('/weekly-summary', dash.getWeeklySummary);
router.get('/doctor-stats', dash.getDoctorStats);

export default router;

