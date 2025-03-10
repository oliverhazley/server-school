// medicationRoutes.js
import express from 'express';
import {
  getMedications,
  getMedication,
  addMedication,
  removeMedication
} from '../controllers/medicationController.js';
import { authenticateToken } from '../middlewares/authentication.js';

const medicationRouter = express.Router();

medicationRouter.get('/', authenticateToken, getMedications);
medicationRouter.get('/:id', authenticateToken, getMedication);
medicationRouter.post('/', authenticateToken, addMedication);
medicationRouter.delete('/:id', authenticateToken, removeMedication);

export default medicationRouter;
