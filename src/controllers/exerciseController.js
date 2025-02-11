import { getAllExercises, getExerciseById, createExercise, deleteExercise } from '../models/exerciseModel.js';

export const getExercises = async (req, res) => {
  const exercises = await getAllExercises();
  res.json(exercises);
};

export const getExercise = async (req, res) => {
  const exercise = await getExerciseById(req.params.id);
  res.json(exercise || { error: 'Exercise not found' });
};

export const addExercise = async (req, res) => {
  const newExercise = await createExercise(req.body);
  res.status(201).json(newExercise);
};

export const removeExercise = async (req, res) => {
  const success = await deleteExercise(req.params.id);
  res.json(success ? { message: 'Exercise deleted' } : { error: 'Exercise not found' });
};