const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', auth, async (req, res) => {
  try {
    let tasks;
    // check if admin
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('project', 'name').populate('assignedTo', 'name email');
    } else {
      tasks = await Task.find({ assignedTo: req.user.id }).populate('project', 'name').populate('assignedTo', 'name email');
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, role('admin'), async (req, res) => {
  // console.log(req.body);
  let { title, description, project, assignedTo, priority, dueDate } = req.body;
  try {
    const task = new Task({ title, description, project, assignedTo, priority, dueDate });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  let { status } = req.body;
  // update task status
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    task.status = status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
