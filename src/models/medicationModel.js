// medicationModel.js
import db from '../utils/database.js';

// get all medications
export const getAllMedications = async () => {
  const [rows] = await db.query('SELECT * FROM Medications');
  return rows;
};
// get all medications filtered by userid
export const getMedicationsByUserId = async (userId) => {
  const [rows] = await db.query('SELECT * FROM Medications WHERE user_id = ?', [userId]);
  return rows;
};

// get a medication by userid
export const getMedicationById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Medications WHERE medication_id = ?', [id]);
  return rows[0];
};

// create a new medication
export const createMedication = async (medication) => {
  const { user_id, name, dosage, frequency } = medication;
  // if you removed start/end date, then remove from the insert
  const [result] = await db.query(
    'INSERT INTO Medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)',
    [user_id, name, dosage, frequency]
  );
  return { medication_id: result.insertId, name };
};

// delete a medication
export const deleteMedication = async (id) => {
  const [result] = await db.query('DELETE FROM Medications WHERE medication_id = ?', [id]);
  return result.affectedRows;
};
