import { getAllItems, getItemById, addItem, deleteItem } from '../models/itemModel.js';

//placeholder - removed items - no use for it????

export const getItems = async (req, res) => {
  const items = await getAllItems();
  res.status(200).json(items);
};

export const getItem = async (req, res) => {
  const item = await getItemById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.status(200).json(item);
};

export const createItem = async (req, res) => {
  const newItem = await addItem(req.body);
  res.status(201).json(newItem);
};

export const removeItem = async (req, res) => {
  const success = await deleteItem(req.params.id);
  if (!success) return res.status(404).json({ error: 'Item not found' });
  res.status(204).send();
};
