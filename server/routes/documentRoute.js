// backend/routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwtMiddleware'); // Middleware to verify JWT token
const User = require('../models/userSchema'); // Assuming you have a User model
const Document = require('../models/documentSchema');

// Route to associate a document with the authenticated user
router.post('/document', verifyToken, async (req, res) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = req.user.userId;

    // Assuming 'ipfsUrl' is sent in the request body
    const { ipfsUrl, type, hash } = req.body;

    // Associate the document with the user in your database
    // Example: Update the user's document field with the IPFS URL
    const document = new Document({
      userId,
      type,
      ipfsUrl,
      hash,
    });

    await document.save();
    console.log(userId, ipfsUrl, type)

    res.status(200).json({ message: 'Document associated with user successfully' });
  } catch (error) {
    console.error('Error associating document with user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verify', verifyToken, async (req, res) => {
  try {
    // Assuming the file is sent in the request body
    const hash = req.body.hash;
    console.log("recived hash", hash)
    // Verify if the document is present in the database
    const document = await Document.findOne({ hash });
    if (!document) {
      console.log("Document not valid")
      return res.status(404).json({ message: 'Document not valid' });
    }
    else {
      console.log("Document is valid")
      return res.status(200).json({ message: 'Document is valid' });
    }
  } catch (error) {
    console.error('Error verifying document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/documents', verifyToken, async (req, res) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = req.user.userId;

    // Fetch documents associated with the user from the database
    const documents = await Document.find({ userId });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
