// exerciseController.js
import {
  getAllExercises,
  getExercisesByUserId,
  getExerciseById,
  createExercise,
  deleteExercise
} from '../models/exerciseModel.js';

export const getExercises = async (req, res) => {
  try {
    if (req.user.user_level === 'admin') {
      // admin => see all
      const exercises = await getAllExercises();
      return res.json(exercises);
    } else {
      // user => only users own
      const userExercises = await getExercisesByUserId(req.user.user_id);
      return res.json(userExercises);
    }
  } catch (err) {
    console.error('Error in getExercises:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getExercise = async (req, res) => {
  // single exercise, check if user is admin or user
  const exercise = await getExerciseById(req.params.id);
  if (!exercise) {
    return res.status(404).json({ error: 'Exercise not found' });
  }
  if (req.user.user_level !== 'admin' && exercise.user_id !== req.user.user_id) {
    return res.status(403).json({ error: 'Not authorized to view this exercise' });
  }
  res.json(exercise);
};

// add exercise
export const addExercise = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { type, duration, intensity, date } = req.body;
    const newExercise = await createExercise({
      user_id,
      type,
      duration,
      intensity,
      date
    });
    return res.status(201).json(newExercise);
  } catch (err) {
    console.error('Error in addExercise:', err);
    return res.status(500).json({ error: 'Failed to add exercise' });
  }
};

// remove exercise
export const removeExercise = async (req, res) => {
  try {
    // fetch the exercise
    const exercise = await getExerciseById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    // check ownership or if admin
    if (req.user.user_level !== 'admin' && exercise.user_id !== req.user.user_id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const success = await deleteExercise(req.params.id);
    res.json(success ? { message: 'Exercise deleted' } : { error: 'Exercise not found' });
  } catch (err) {
    console.error('Error removing exercise:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
