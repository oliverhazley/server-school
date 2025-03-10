// entryController.js

import {
  getAllEntries,
  getEntryById,
  getEntriesByUserId,
  updateEntry,
  deleteEntry,
  addEntry
} from '../models/entryModel.js';

// fetch multiple entries
// If user is new and has no entries, getEntriesByUserId() should return []
export const getEntries = async (req, res) => {
  try {
    if (req.user.user_level === 'admin') {
      const all = await getAllEntries(); // always an array, e.g. []
      return res.json(all);
    } else {
      const userEntries = await getEntriesByUserId(req.user.user_id);
      // if user is new, userEntries might be [] (0 rows).
      // but it is still an array, so .map() won't crash.
      return res.json(userEntries);
    }
  } catch (err) {
    console.error('Error in getEntries:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// fetch single entry by ID (for editing / detail view)
export const getEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    // if not admin and user does not own this entry => 403
    if (req.user.user_level !== 'admin' && entry.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized to view this entry' });
    }
    return res.json(entry);
  } catch (error) {
    console.error('Error in getEntry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// edit one entry
export const editEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    if (req.user.user_level !== 'admin' && entry.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const updated = await updateEntry(req.params.id, req.body);
    if (updated) {
      return res.json({ message: 'Entry updated' });
    } else {
      return res.json({ error: 'Nothing updated' });
    }
  } catch (error) {
    console.error('Error in editEntry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// delete an entry
export const removeEntry = async (req, res) => {
  try {
    const entry = await getEntryById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    if (req.user.user_level !== 'admin' && entry.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const deleted = await deleteEntry(req.params.id);
    if (deleted) {
      return res.json({ message: 'Entry deleted' });
    } else {
      return res.json({ error: 'Nothing deleted' });
    }
  } catch (error) {
    console.error('Error in removeEntry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// create new entry
export const postEntry = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { entry_date, mood, weight, sleep_hours, notes } = req.body;
    // create entry
    const newId = await addEntry({
      user_id,
      entry_date,
      mood,
      weight,
      sleep_hours,
      notes
    });
    return res.status(201).json({ message: 'New entry created', entry_id: newId });
  } catch (error) {
    console.error('Error in postEntry:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
