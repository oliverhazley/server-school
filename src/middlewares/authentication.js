// src/middlewares/authentication.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);

  const authHeader = req.headers['authorization']; // example- "Bearer abc123"
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);

  if (!token) {
    return res.sendStatus(401); // No token => Unauthorized
  }

  try {
    // Verify token
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ message: 'invalid token' });
  }
};
