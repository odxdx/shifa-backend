import express from 'express';
import { getPatients, getNextFileId, createPatient, updatePatient } from '../models/patientModel.js';
import * as dash from '../controllers/dashboardController.js';
import * as visit from '../controllers/visitsController.js';
import * as exp from '../controllers/expensesController.js';

const router = express.Router();

// --- مسارات المرضى (Patients) ---
router.get('/patients', getPatients);
router.get('/patients/next-id', getNextFileId);
router.post('/patients', createPatient);
router.put('/patients/:id', updatePatient);

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
router.get('/doctor-stats', dash.getDoctorStats);

// ... الاستيرادات السابقة تبقى كما هي

// --- مسارات لوحة التحكم (Dashboard) ---
router.get('/monthly-summary', dash.getMonthlySummary); // تأكد من وجوده

// إذا أضفت الدالة الأسبوعية:
router.get('/weekly-summary', dash.getWeeklySummary); 


export default router;