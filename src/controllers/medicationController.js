// medicationController.js
import {
  getAllMedications,
  getMedicationsByUserId,
  getMedicationById,
  createMedication,
  deleteMedication
} from '../models/medicationModel.js';

export const getMedications = async (req, res) => {
  try {
    if (req.user.user_level === 'admin') {
      const meds = await getAllMedications();
      return res.json(meds);
    } else {
      const userMeds = await getMedicationsByUserId(req.user.user_id);
      return res.json(userMeds);
    }
  } catch (err) {
    console.error('Error in getMedications:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMedication = async (req, res) => {
  try {
    const med = await getMedicationById(req.params.id);
    if (!med) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    if (req.user.user_level !== 'admin' && med.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized to view this medication' });
    }
    return res.json(med);
  } catch (err) {
    console.error('Error in getMedication:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMedication = async (req, res) => {
  try {
    // user id from token
    const user_id = req.user.user_id;
    const { name, dosage, frequency } = req.body;
    const newMed = await createMedication({ user_id, name, dosage, frequency });
    return res.status(201).json(newMed);
  } catch (err) {
    console.error('Error adding medication:', err);
    return res.status(500).json({ error: 'Failed to add medication' });
  }
};

export const removeMedication = async (req, res) => {
  try {
    const med = await getMedicationById(req.params.id);
    if (!med) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    if (req.user.user_level !== 'admin' && med.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const success = await deleteMedication(req.params.id);
    res.json(success ? { message: 'Medication deleted' } : { error: 'Medication not found' });
  } catch (err) {
    console.error('Error removing medication:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
