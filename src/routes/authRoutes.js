// src/routes/auth-router.js
import express from 'express';
import { postLogin, getMe } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authentication.js';

const authRouter = express.Router();

// POST /api/auth/login
authRouter.post('/login', postLogin);

// GET /api/auth/me  (protected)
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
