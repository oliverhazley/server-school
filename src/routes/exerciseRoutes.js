import express from 'express';
import { getExercises, getExercise, addExercise, removeExercise } from '../controllers/exerciseController.js';

const exerciseRouter = express.Router();
exerciseRouter.get('/', getExercises);
exerciseRouter.get('/:id', getExercise);
exerciseRouter.post('/', addExercise);
exerciseRouter.delete('/:id', removeExercise);

export default exerciseRouter;