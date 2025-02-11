import express from 'express';
import { getMedications, getMedication, addMedication, removeMedication } from '../controllers/medicationController.js';

const medicationRouter = express.Router();
medicationRouter.get('/', getMedications);
medicationRouter.get('/:id', getMedication);
medicationRouter.post('/', addMedication);
medicationRouter.delete('/:id', removeMedication);

export default medicationRouter;