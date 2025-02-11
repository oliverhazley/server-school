import { getAllEntries, getEntryById, updateEntry, deleteEntry } from '../models/entryModel.js';

export const getEntries = async (req, res) => {
  res.json(await getAllEntries());
};

export const getEntry = async (req, res) => {
  res.json(await getEntryById(req.params.id));
};

export const editEntry = async (req, res) => {
  const updated = await updateEntry(req.params.id, req.body);
  res.json(updated ? { message: 'Entry updated' } : { error: 'Entry not found' });
};

export const removeEntry = async (req, res) => {
  const deleted = await deleteEntry(req.params.id);
  res.json(deleted ? { message: 'Entry deleted' } : { error: 'Entry not found' });
};
