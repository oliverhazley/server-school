import { getAllMedications, getMedicationById, createMedication, deleteMedication } from '../models/medicationModel.js';

export const getMedications = async (req, res) => {
  const medications = await getAllMedications();
  res.json(medications);
};

export const getMedication = async (req, res) => {
  const medication = await getMedicationById(req.params.id);
  res.json(medication || { error: 'Medication not found' });
};

export const addMedication = async (req, res) => {
  const newMedication = await createMedication(req.body);
  res.status(201).json(newMedication);
};

export const removeMedication = async (req, res) => {
  const success = await deleteMedication(req.params.id);
  res.json(success ? { message: 'Medication deleted' } : { error: 'Medication not found' });
};
