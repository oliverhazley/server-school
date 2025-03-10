// waterRoutes.js
import express from 'express';
import {
  getWaterLogs,
  postWaterLog,
  putWaterLog,
  deleteWaterLog
} from '../controllers/waterController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { body } from 'express-validator';
import { validationErrorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

/*
 GET /api/water
 gets water logs for this user or all logs if admin
*/
router.get('/', authenticateToken, getWaterLogs);

/*
 POST /api/water
 create a new water log
   - consumption_date must be a valid date
   - cups must be numeric, min 0, max 100
 run validationErrorHandler to see if there is an error
*/
router.post(
  '/',
  authenticateToken,
  body('consumption_date').isDate(),
  body('cups').isInt({ min: 0, max: 100 }),
  validationErrorHandler,
  postWaterLog
);

/*
 PUT /api/water/:id
 update water log
 cups must be number
*/
router.put(
  '/:id',
  authenticateToken,
  body('cups').isInt({ min: 0, max: 100 }),
  validationErrorHandler,
  putWaterLog
);

/*
 DELETE /api/water/:id
 remove a water log
*/
router.delete('/:id', authenticateToken, deleteWaterLog);

export default router;
