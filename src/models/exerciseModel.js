// exerciseModel.js
import db from '../utils/database.js';

// get all the exercises
export const getAllExercises = async () => {
  const [rows] = await db.query('SELECT * FROM Exercises');
  return rows;
};

// get exercises filtered by userid
export const getExercisesByUserId = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM Exercises WHERE user_id = ?',
    [userId]
  );
  return rows;
};

// get a particular exercise
export const getExerciseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Exercises WHERE exercise_id = ?', [id]);
  return rows[0];
};

// create new exercise
export const createExercise = async (exercise) => {
  const { user_id, type, duration, intensity, date } = exercise;
  const [result] = await db.query(
    'INSERT INTO Exercises (user_id, type, duration, intensity, date) VALUES (?, ?, ?, ?, ?)',
    [user_id, type, duration, intensity, date]
  );
  return { exercise_id: result.insertId, type };
};

// delete an exercise
export const deleteExercise = async (id) => {
  const [result] = await db.query('DELETE FROM Exercises WHERE exercise_id = ?', [id]);
  return result.affectedRows;
};
