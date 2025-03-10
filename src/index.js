import express from 'express';
import cors from 'cors';

import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import entryRoutes from './routes/entryRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import authRouter from './routes/authRoutes.js';
import waterRouter from './routes/waterRoutes.js';

import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/items', itemRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);
app.use('/api/water', waterRouter);

// 404 Handler
app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
