// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const verifyToken = require('../middlewares/jwtMiddleware.js');
const User = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET;

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
      res.status(200).json({ name: user.username, email : user.email });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/change-password', verifyToken, async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const userId = req.user.userId;
      
      // Validate input
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
  
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }
  
      // Fetch user from database
      const user = await User.findById(userId);
  
      // Check if current password matches
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password in the database
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/document/types', verifyToken, async (req, res) => {
    try {
      // Get the authenticated user's ID from the request
      const userId = req.user.userId;
  
      // Fetch all document types uploaded by the user
      const documentTypes = await Document.distinct('type', { userId });
  
      res.status(200).json(documentTypes);
    } catch (error) {
      console.error('Error fetching uploaded document types:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
