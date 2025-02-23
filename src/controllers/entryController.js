import { getAllEntries, getEntryById, updateEntry, deleteEntry } from '../models/entryModel.js';

export const getEntry = async (req, res) => {
  res.json(await getEntryById(req.params.id));
};

export const getEntries = async (req, res) => {
  // If admin, return all
  if (req.user.user_level === 'admin') {
    const all = await getAllEntries();
    return res.json(all);
  } else {
    // else return only own
    const myEntries = await getEntryById(req.user.user_id);
    return res.json(myEntries);
  }
};

export const editEntry = async (req, res) => {
  // Find the existing entry
  const entry = await getEntryById(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  // If user is not admin and not owner, nope
  if (req.user.user_level !== 'admin' && entry.user_id !== req.user.user_id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  // Otherwise update
  const updated = await updateEntry(req.params.id, req.body);
  res.json(updated ? { message: 'Entry updated' } : { error: 'Nothing updated' });
};

export const removeEntry = async (req, res) => {
  const entry = await getEntryById(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });

  // If user is not admin and not the owner => 403 nope
  if (req.user.user_level !== 'admin' && entry.user_id !== req.user.user_id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const deleted = await deleteEntry(req.params.id);
  res.json(deleted ? { message: 'Entry deleted' } : { error: 'Nothing deleted' });
};
