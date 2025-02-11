import db from '../utils/database.js';

export const getAllMedications = async () => {
  const [rows] = await db.query('SELECT * FROM Medications');
  return rows;
};

export const getMedicationById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Medications WHERE medication_id = ?', [id]);
  return rows[0];
};

export const createMedication = async (medication) => {
  const { user_id, name, dosage, frequency, start_date, end_date } = medication;
  const [result] = await db.query(
    'INSERT INTO Medications (user_id, name, dosage, frequency, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, name, dosage, frequency, start_date, end_date]
  );
  return { medication_id: result.insertId, name };
};

export const deleteMedication = async (id) => {
  const [result] = await db.query('DELETE FROM Medications WHERE medication_id = ?', [id]);
  return result.affectedRows;
};
