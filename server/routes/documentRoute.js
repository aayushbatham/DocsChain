// backend/routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwtMiddleware'); // Middleware to verify JWT token
const User = require('../models/userSchema'); // Assuming you have a User model

// Route to associate a document with the authenticated user
router.post('/document', verifyToken, async (req, res) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = req.user.userId;

    // Assuming 'ipfsUrl' is sent in the request body
    const { ipfsUrl } = req.body;

    // Associate the document with the user in your database
    // Example: Update the user's document field with the IPFS URL
    await User.findByIdAndUpdate(userId, { $push: { documents: ipfsUrl } });
    console.log(userId, ipfsUrl)

    res.status(200).json({ message: 'Document associated with user successfully' });
  } catch (error) {
    console.error('Error associating document with user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
