let users = [
  { id: 1, username: 'johndoe', password: 'password1', email: 'johndoe@example.com' },
  { id: 2, username: 'janedoe', password: 'password2', email: 'janedoe@example.com' },
  { id: 3, username: 'bobsmith', password: 'password3', email: 'bobsmith@example.com' },
];

const getUsers = (req, res) => {
  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
};

const createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.username || !newUser.password || !newUser.email) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  res.status(200).json({ message: 'Login successful', user });
};

export { getUsers, getUserById, createUser, loginUser };
