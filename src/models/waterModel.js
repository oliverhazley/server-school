// waterModel.js
// we import our database connection
import db from '../utils/database.js';

/*
 this function returns all water logs in the table
 normally only admins would want every record,
 so watch out for permission checks in the controller
*/
export const getAllWaterIntake = async () => {
  const [rows] = await db.query('SELECT * FROM WaterConsumption');
  return rows;
};

/*
 this function returns water logs for a specific user
*/
export const getWaterIntakeByUser = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM WaterConsumption WHERE user_id = ? ORDER BY consumption_date DESC',
    [userId]
  );
  return rows;
};

/*
 this function creates a new row in the database
 meaning we log the daily cups of water
*/
export const createWaterIntake = async (userId, consumptionDate, cups) => {
  const [result] = await db.query(
    'INSERT INTO WaterConsumption (user_id, consumption_date, cups) VALUES (?, ?, ?)',
    [userId, consumptionDate, cups]
  );
  return { water_id: result.insertId, user_id: userId, consumption_date: consumptionDate, cups };
};

/*
 this function updates an existing water record
*/
export const updateWaterIntake = async (waterId, cups) => {
  const [result] = await db.query(
    'UPDATE WaterConsumption SET cups = ? WHERE water_id = ?',
    [cups, waterId]
  );
  return result.affectedRows; // 1 if updated, 0 if not
};

/*
 this function deletes an existing water record by ID
*/
export const deleteWaterIntake = async (waterId) => {
  const [result] = await db.query(
    'DELETE FROM WaterConsumption WHERE water_id = ?',
    [waterId]
  );
  return result.affectedRows; // 1 if deleted, 0 if nothing found
};
