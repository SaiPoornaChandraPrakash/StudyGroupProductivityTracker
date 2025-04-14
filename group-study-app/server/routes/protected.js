const express = require('express');
const authenticate = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/me', authenticate, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

module.exports = router;