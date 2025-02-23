import express from 'express';
import { getUsers, getUser, addUser, removeUser, loginUser} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { updateUser } from '../controllers/userController.js';

const router = express.Router();


router.get('/', authenticateToken, getUsers);
router.get('/:id',authenticateToken, getUser);
router.post('/', addUser);
router.delete('/:id',authenticateToken, removeUser);
router.post('/login', authenticateToken, loginUser);
router.get('/me', authenticateToken);
router.put('/:id', authenticateToken, updateUser);

export default router;
