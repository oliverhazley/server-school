// entryRoutes.js
import express from 'express';
import {
  getEntries,
  getEntry,
  editEntry,
  removeEntry,
  postEntry
} from '../controllers/entryController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

router.put('/:id', authenticateToken, editEntry);
router.delete('/:id', authenticateToken, removeEntry);
router.get('/', authenticateToken, getEntries);
router.get('/:id', authenticateToken, getEntry);
router.post(
  '/',
  authenticateToken,
  body('entry_date').isDate(),
  body('mood').optional().isString().isLength({ max: 255 }),
  body('weight').optional().isFloat({ min: 0, max: 1000 }),
  body('sleep_hours').optional().isInt({ min: 0, max: 24 }),
  validationErrorHandler,
  postEntry
);

export default router;
