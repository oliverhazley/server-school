import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import entryRoutes from './routes/entryRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import authRouter from './routes/authRoutes.js';
import waterRouter from './routes/waterRoutes.js';

import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Restrict CORS to Netlify frontend + local
const allowedOrigins = [
  'https://healthdiary.netlify.app/',
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
