import express from 'express';
// استيراد جميع المتحكمات (Controllers)
import * as patientCtrl from '../controllers/patientsController.js';
import * as dash from '../controllers/dashboardController.js';
import * as visit from '../controllers/visitsController.js';
import * as exp from '../controllers/expensesController.js';

const router = express.Router();

// --- مسارات المرضى (Patients) ---
// تأكد أن هذه الدوال موجودة في patientsController.js بنظام async/await
router.get('/patients', patientCtrl.getPatients); 
router.get('/patients/next-id', patientCtrl.getNextFileId);
router.post('/patients', patientCtrl.createPatient);
router.put('/patients/:id', patientCtrl.updatePatient);

// --- مسارات الزيارات (Visits) ---
router.get('/visits', visit.getAllVisits);
router.post('/visits', visit.createVisit);
router.delete('/visits/:id', visit.deleteVisit);

// --- مسارات المصروفات (Expenses) ---
router.get('/expenses/:date', exp.getExpenses); 
router.post('/expenses', exp.addExpense);
router.delete('/expenses/:id', exp.deleteExpense);

// --- مسارات لوحة التحكم (Dashboard) ---
router.get('/daily-summary', dash.getDailySummary);
router.get('/monthly-summary', dash.getMonthlySummary);
router.get('/weekly-summary', dash.getWeeklySummary);
router.get('/doctor-stats', dash.getDoctorStats);

export default router;
