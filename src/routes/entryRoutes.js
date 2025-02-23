import express from 'express';
import { getEntries, getEntry, editEntry, removeEntry } from '../controllers/entryController.js';
import { authenticateToken } from '../middlewares/authentication.js';

const router = express.Router();


router.put('/:id', authenticateToken, editEntry);
router.delete('/:id', authenticateToken, removeEntry);
router.get('/', authenticateToken, getEntries);
router.get('/:id', authenticateToken, getEntry);


export default router;
