import db from '../db.js';

export const fetchPatients = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM patients");
    res.json(rows); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPatient = async (req, res) => {
  const { file_id, name, phone } = req.body; 
  try {
    // Change 'file_id' to 'file_number' if that's what is in your DB
    await db.query(
      "INSERT INTO patients (file_id, name, phone) VALUES (?, ?, ?)",
      [file_id, name, phone]
    );
    res.status(201).json({ message: "Patient created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// backend/controllers/patientsController.js

export const deletePatient = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM patients WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "تم حذف المريض بنجاح" });
    });
};