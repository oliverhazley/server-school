import { getAllUsers, getUserById, createUser, deleteUser, loginUser } from '../models/userModel.js';

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const getUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
};

export const addUser = async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
};

export const removeUser = async (req, res) => {
  const success = await deleteUser(req.params.id);
  if (!success) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ message: 'User deleted successfully' });
};

export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await loginUser(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.status(200).json({ message: 'Login successful', user });
};
