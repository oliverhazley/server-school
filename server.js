import express from 'express'; // Import Express
import { getItems, getItemById, addItem, deleteItem } from './src/items.js'; // Import item routes
import { getUsers, getUserById, createUser, loginUser } from './src/users.js'; // Import user routes

const app = express(); // Initialize Express app
const PORT = 3000; // Define server port

// Middleware to parse incoming JSON
app.use(express.json());

// Register routes for items

// GET all items
// URL: http://localhost:3000/items
app.get('/items', getItems);

// GET a specific item by ID
// URL: http://localhost:3000/items/:id
// Example: http://localhost:3000/items/1
app.get('/items/:id', getItemById);

// POST to add a new item
// URL: http://localhost:3000/items
// Body (JSON): { "name": "New Item" }
app.post('/items', addItem);

// DELETE an item by ID
// URL: http://localhost:3000/items/:id
// Example: http://localhost:3000/items/1
app.delete('/items/:id', deleteItem);

// Register routes for users

// GET all users
// URL: http://localhost:3000/users
app.get('/users', getUsers);

// GET a specific user by ID
// URL: http://localhost:3000/users/:id
// Example: http://localhost:3000/users/1
app.get('/users/:id', getUserById);

// POST to create a new user
// URL: http://localhost:3000/users
// Body (JSON): { "username": "***", "password": "***", "email": "***@***.***" }
app.post('/users', createUser);

// POST to login a user
// URL: http://localhost:3000/users/login
// Body (JSON): { "username": "johndoe", "password": "password1" }
app.post('/users/login', loginUser);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
