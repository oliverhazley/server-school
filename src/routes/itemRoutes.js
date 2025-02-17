import express from 'express';
import { getItems, getItem, createItem, removeItem } from '../controllers/itemController.js';


// placeholder removed items - no use for it???

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', removeItem);

export default router;
