import express from 'express';
import { getItems, getItem, createItem, removeItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', removeItem);

export default router;
