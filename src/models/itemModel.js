import db from '../utils/database.js';

//placeholder - removed items - no use for it?

export const getAllItems = async () => {
  const [rows] = await db.query('SELECT * FROM items');
  return rows;
};

export const getItemById = async (id) => {
  const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
  return rows[0];
};

export const addItem = async (item) => {
  const { name } = item;
  const [result] = await db.query('INSERT INTO items (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
};

export const deleteItem = async (id) => {
  const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
  return result.affectedRows;
};
