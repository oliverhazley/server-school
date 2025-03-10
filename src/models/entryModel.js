// entryModel.js

import db from '../utils/database.js';

// get all entries
export const getAllEntries = async () => {
  const [rows] = await db.query('SELECT * FROM DiaryEntries');
  return rows;
};

// get a single entry by its primary key (entry_id)
export const getEntryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
  return rows[0]; // single object
};

// NEW: get all entries for a specific user_id
export const getEntriesByUserId = async (user_id) => {
  const [rows] = await db.query('SELECT * FROM DiaryEntries WHERE user_id = ?', [user_id]);
  // returns an array of rows
  return rows;
};

// update a single entry
export const updateEntry = async (id, updatedEntry) => {
  const { mood, weight, sleep_hours, notes } = updatedEntry;
  const [result] = await db.query(
    'UPDATE DiaryEntries SET mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE entry_id = ?',
    [mood, weight, sleep_hours, notes, id]
  );
  return result.affectedRows;
};

// delete a single entry
export const deleteEntry = async (id) => {
  const [result] = await db.query('DELETE FROM DiaryEntries WHERE entry_id = ?', [id]);
  return result.affectedRows;
};

// add (create) a new entry
export const addEntry = async (entry) => {
  const { user_id, entry_date, mood, weight, sleep_hours, notes } = entry;
  const [result] = await db.query(
    'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, entry_date, mood, weight, sleep_hours, notes]
  );
  return result.insertId;
};
