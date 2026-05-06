const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config({ path: path.join(__dirname, '.env') });

var app = express(); // init express app

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
let projectRoutes = require('./routes/projects');
var taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const auth = require('./middleware/auth');
const Task = require('./models/Task'); // model
const User = require('./models/User');

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

    const tasks = await Task.find(taskQuery).populate('assignedTo', 'name');
    // console.log(tasks);
    
    const total = tasks.length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const now = new Date();
    const overdue = tasks.filter(t => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now).length;

    let tasksPerUser = {};
    if (role === 'admin') {
      tasks.forEach(t => {
        if (t.assignedTo) {
          tasksPerUser[t.assignedTo.name] = (tasksPerUser[t.assignedTo.name] || 0) + 1;
        }
      });
    }

    res.json({ total, statusCounts: { todo, inProgress, done }, overdue, tasksPerUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ethara')
  .then(() => {
    console.log('Connected to MongoDB');
    // start server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
