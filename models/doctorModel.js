import db from '../db.js';

export const getDoctorsList = (req, res) => {
    db.query(`SELECT * FROM doctors`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};