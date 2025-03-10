import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import itemRoutes from './src/routes/itemRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import entryRoutes from './src/routes/entryRoutes.js';
import medicationRoutes from './src/routes/medicationRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';
import authRouter from './src/routes/authRoutes.js';
import waterRouter from './src/routes/waterRoutes.js';

import { notFoundHandler, errorHandler } from './src/middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Restrict CORS to Netlify frontend + local
const allowedOrigins = [
  'https://healthdiary.netlify.app',
  'http://localhost:3000' // Allow localhost for testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // ✅ Allow cookies & authentication
}));

app.use(express.json());

// ✅ Log all incoming requests (useful for Azure monitoring)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
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
  console.log(`Server running on port ${PORT}`);
});
