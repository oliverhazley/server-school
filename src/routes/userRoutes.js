import express from 'express';
import { getUsers, getUser, addUser, removeUser, authenticateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.delete('/:id', removeUser);
router.post('/login', authenticateUser);

export default router;
