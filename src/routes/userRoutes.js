import express from 'express';
import { getUsers, getUser, addUser, removeUser, loginUser} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { updateUser } from '../controllers/userController.js';
import { body } from 'express-validator';
import {validationErrorHandler} from "../middlewares/errorHandler.js";

const router = express.Router();


router.get('/', authenticateToken, getUsers);
router.get('/:id',authenticateToken, getUser);
router.post(
  '/',
  body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
  body('email').trim().isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  validationErrorHandler,
  addUser
);
router.delete('/:id',authenticateToken, removeUser);
router.post('/login', authenticateToken, loginUser);
router.get('/me', authenticateToken);
router.put('/:id', authenticateToken, updateUser);

export default router;
