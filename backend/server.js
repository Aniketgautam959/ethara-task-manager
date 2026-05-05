const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

var app = express(); // init express app

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
let projectRoutes = require('./routes/projects');
var taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const auth = require('./middleware/auth');
const Task = require('./models/Task'); // model

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/api/dashboard', auth, async (req, res) => {
  try {
    let userId = req.user.id;
    let role = req.user.role;
    // console.log("user role:", role);
    
    let taskQuery = {};
    if (role === 'member') {
      taskQuery.assignedTo = userId;
    }

    const tasks = await Task.find(taskQuery);
    // console.log(tasks);
    
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const pending = total - completed;
    const now = new Date();
    const overdue = tasks.filter(t => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now).length;

    res.json({ total, completed, pending, overdue });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ethara')
  .then(() => {
    console.log('Connected to MongoDB');
    // start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
