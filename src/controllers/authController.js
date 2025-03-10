// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { selectUserByNameAndPassword } from '../models/userModel.js';

export const postLogin = async (req, res) => {
  console.log('postLogin', req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  try {
    const user = await selectUserByNameAndPassword(username, password);

    if (!user) {
      // If no user found or password doesnt match
      return res.sendStatus(401); // Unauthorized
    }

    // user is valid -> generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Return user + token
    return res.json({ ...user, token });
  } catch (err) {
    console.error('Error in postLogin:', err);
    res.sendStatus(500);
  }
};


export const getMe = (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    return res.json({ message: 'token ok', user: req.user });
  } else {
    return res.sendStatus(401);
  }
};
