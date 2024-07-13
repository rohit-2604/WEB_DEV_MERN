const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/crud')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// GET all users
app.get('/users', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }));
});



// POST create a new user
app.post('/users', (req, res) => {
  const { name, email, age, role, gender } = req.body;
  const newUser = new UserModel({ name, email, age, role, gender });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});


// GET a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
