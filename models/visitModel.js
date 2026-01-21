import db from "../db.js";

export const addVisit = (visit) => {
  const sql = `INSERT INTO visits 
  (visit_date,file_id,patient_name,procedure_name,doctor,total,paid,payment_method)
  VALUES (?,?,?,?,?,?,?,?)`;

  const values = [
    visit.date,
    visit.file_id,
    visit.name,
    visit.proc,
    visit.doc,
    visit.total,
    visit.paid,
    visit.method
  ];

  return new Promise((resolve,reject)=>{
    db.query(sql, values, (err,res)=>{
      if(err) reject(err);
      resolve(res);
    });
  });
};

export const getVisitsByDate = (date) => {
  return new Promise((resolve,reject)=>{
    db.query("SELECT * FROM visits WHERE visit_date=?", [date], (err,data)=>{
      if(err) reject(err);
      resolve(data);
    });
  });
};
