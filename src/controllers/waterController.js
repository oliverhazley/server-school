// waterController.js

import {
  getAllWaterIntake,
  getWaterIntakeByUser,
  createWaterIntake,
  updateWaterIntake,
  deleteWaterIntake
} from '../models/waterModel.js';

/*
 getWaterLogs
 if the user is an admin, we could return all logs
 otherwise, we only return logs for the user making the request
*/
export const getWaterLogs = async (req, res) => {
  try {
    if (req.user.user_level === 'admin') {
      const data = await getAllWaterIntake();
      return res.json(data);
    } else {
      // not admin => only your own logs
      const data = await getWaterIntakeByUser(req.user.user_id);
      return res.json(data);
    }
  } catch (err) {
    console.error('Error in getWaterLogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/*
 postWaterLog
 create a new water record for the user
 the date and cups come from req.body
 user_id comes from the token
*/
export const postWaterLog = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { consumption_date, cups } = req.body;

    // for example: consumption_date must be a valid date
    // cups must be a positive number

    const newRecord = await createWaterIntake(userId, consumption_date, cups);
    return res.status(201).json(newRecord);
  } catch (err) {
    console.error('Error in postWaterLog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/*
 putWaterLog
 update an existing water record
 we must confirm the user is either admin or
 they actually own the record they are trying to edit
*/
export const putWaterLog = async (req, res) => {
  try {
    const waterId = req.params.id;
    const { cups } = req.body;

    // check if this record belongs to the user or user is admin

    const updated = await updateWaterIntake(waterId, cups);
    if (updated) {
      res.json({ message: 'Water consumption updated' });
    } else {
      res.status(404).json({ error: 'Water record not found' });
    }
  } catch (err) {
    console.error('Error in putWaterLog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/*
 deleteWaterLog
 remove a water record by its ID

*/
export const deleteWaterLog = async (req, res) => {
  try {
    const waterId = req.params.id;
    const deleted = await deleteWaterIntake(waterId);
    if (deleted) {
      res.json({ message: 'Water record deleted' });
    } else {
      res.status(404).json({ error: 'Water record not found' });
    }
  } catch (err) {
    console.error('Error in deleteWaterLog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
