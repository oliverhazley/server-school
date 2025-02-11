import express from 'express';
import { getEntries, getEntry, editEntry, removeEntry } from '../controllers/entryController.js';

const router = express.Router();
router.get('/', getEntries);
router.get('/:id', getEntry);
router.put('/:id', editEntry);
router.delete('/:id', removeEntry);

export default router;
