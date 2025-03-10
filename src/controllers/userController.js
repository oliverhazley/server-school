import { getAllUsers, getUserById, createUser, deleteUser} from '../models/userModel.js';
import 'dotenv/config';


// userController.js

export const getUsers = async (req, res) => {
  // If user_level is NOT admin => only show own data
  if (req.user.user_level !== 'admin') {
    const user = await getUserById(req.user.user_id);
    return res.json([user]); // own user data
  }
  // If admin => yup
  const users = await getAllUsers();
  res.json(users);
};


export const getUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
};

export const addUser = async (req, res, next) => {
  try {
    // If we get here - validation is passed
    const newUser = await createUser(req.body);
    // createUser does the hashing etc.

    res.status(201).json(newUser);
  } catch (error) {
    // unexpected error - pass it to the error middleware
    next(error);
  }
};

export const removeUser = async (req, res) => {
  const success = await deleteUser(req.params.id);
  if (!success) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ message: 'User deleted successfully' });
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await loginUser(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.status(200).json({ message: 'Login successful', user });
  };



export const updateUser = async (req, res) => {
  // if user is not admin, check param id = token user_id
  if (req.user.user_level !== 'admin' && parseInt(req.params.id) !== req.user.user_id) {
    return res.status(403).json({ error: 'You can only update your own user info' });
  }

  // update (kinda placeholder)
  const success = await updateUserModel(req.params.id, req.body);
  if (!success) return res.status(404).json({ error: 'No update done' });
  res.json({ message: 'User updated' });
};
