// exerciseRoutes.js
import express from 'express';
import { getExercises, getExercise, addExercise, removeExercise } from '../controllers/exerciseController.js';
import { authenticateToken } from '../middlewares/authentication.js';

const exerciseRouter = express.Router();

// PROTECT all exercise routes so you have req.user
exerciseRouter.get('/', authenticateToken, getExercises);
exerciseRouter.get('/:id', authenticateToken, getExercise);
exerciseRouter.post('/', authenticateToken, addExercise);
exerciseRouter.delete('/:id', authenticateToken, removeExercise);

export default exerciseRouter;
