import db from '../utils/database.js';
import bcrypt from 'bcryptjs';


// get all users
export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT user_id, username, email, user_level FROM users');
  return rows;
};

// get a user by id
export const getUserById = async (id) => {
  const [rows] = await db.query('SELECT user_id, username, email, user_level FROM users WHERE user_id = ?', [id]);
  return rows[0];
};

// delete a user by id
export const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
  return result.affectedRows;
};

// create a new user and new id
export const createUser = async (user) => {
  const { username, password, email } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [result] = await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
  return { id: result.insertId, username, email };
};


// select by username, compare password with bcrypt (for validation)
export const selectUserByNameAndPassword = async (username, password) => {
  const [rows] = await db.query(
    'SELECT user_id, username, password, email, user_level FROM users WHERE username = ?',
    [username]
  );
  if (rows.length === 0) return null; // no user

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;


  return {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    user_level: user.user_level
  };
};