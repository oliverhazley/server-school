import db from '../utils/database.js';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows[0];
};

export const createUser = async (user) => {
  const { username, password, email } = user;
  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
  return { id: result.insertId, username, email };
};

export const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
  return result.affectedRows;
};

export const loginUser = async (username, password) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
  return rows[0];
};
