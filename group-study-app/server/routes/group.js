const express = require('express');
const Group = require('../models/Group');
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const router = express.Router();

// Create a group
router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('Group name is required');
    }

    const group = new Group({
      name,
      description,
      members: [req.user._id],
      admins: [req.user._id]
    });

    await group.save();

    // Add group to user's list
    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });

    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
});

// Join a group
router.post('/join/:groupId', authenticate, async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      res.status(404);
      throw new Error('Group not found');
    }

    if (group.members.includes(req.user._id)) {
      res.status(400);
      throw new Error('Already a member of this group');
    }

    group.members.push(req.user._id);
    await group.save();

    await User.findByIdAndUpdate(req.user._id, { $push: { groups: group._id } });

    res.json({ msg: 'Joined group successfully', group });
  } catch (err) {
    next(err);
  }
});

// Get all groups the user belongs to
router.get('/my-groups', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('groups');
    res.json(user.groups);
  } catch (err) {
    next(err);
  }
});

module.exports = router;