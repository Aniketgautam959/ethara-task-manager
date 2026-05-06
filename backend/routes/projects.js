const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.get('/', auth, async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'admin') {
      projects = await Project.find().populate('createdBy', 'name').populate('members', 'name email');
    } else {
      projects = await Project.find({ members: req.user.id }).populate('createdBy', 'name').populate('members', 'name email');
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, role('admin'), async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const project = new Project({
      name, description, createdBy: req.user.id, members: members || []
    });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
