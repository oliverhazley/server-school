import db from '../utils/database.js';

export const getAllEntries = async () => {
  const [rows] = await db.query('SELECT * FROM DiaryEntries');
  return rows;
};

export const getEntryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
  return rows[0];
};

export const updateEntry = async (id, updatedEntry) => {
  const { mood, weight, sleep_hours, notes } = updatedEntry;
  const [result] = await db.query(
    'UPDATE DiaryEntries SET mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE entry_id = ?',
    [mood, weight, sleep_hours, notes, id]
  );
  return result.affectedRows;
};

export const deleteEntry = async (id) => {
  const [result] = await db.query('DELETE FROM DiaryEntries WHERE entry_id = ?', [id]);
  return result.affectedRows;
};

export const addEntry = async (entry) => {
  const { user_id, entry_date, mood, weight, sleep_hours, notes } = entry;
  const [result] = await db.query(
    'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, entry_date, mood, weight, sleep_hours, notes]
  );
  return result.insertId;
};