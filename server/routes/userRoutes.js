// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const verifyToken = require('../middlewares/jwtMiddleware.js');
const User = require('../models/userSchema.js');

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);

// Logout route
router.post('/logout', userController.logout);

router.get('/details', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId); // Assuming your user model has a 'name' field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ name: user.username });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;
