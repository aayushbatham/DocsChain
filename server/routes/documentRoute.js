const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwtMiddleware'); // Middleware to verify JWT token
const Document = require('../models/documentSchema');
const AuditLog = require('../models/auditLogSchema');
// Route to associate a document with the authenticated user
router.post('/document', verifyToken, async (req, res) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = req.user.userId;

    // Assuming 'ipfsUrl', 'type', and 'hash' are sent in the request body
    const { ipfsUrl, type, hash } = req.body;

    // Check if a document with the same hash already exists
    const existingDocument = await Document.findOne({ hash });
    if (existingDocument) {
      return res.status(400).json({ message: 'Document with the same hash already exists' });
    }

    // Create and save a new document associated with the user
    const document = new Document({
      userId,
      type,
      ipfsUrl,
      hash,
    });

    await document.save();
    res.status(200).json({ message: 'Document associated with user successfully' });
  } catch (error) {
    console.error('Error associating document with user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to verify if a document exists based on hash
router.post('/verify', verifyToken, async (req, res) => {
  try {
    // Extract the hash from the request body
    const { hash } = req.body;

    // Verify if the document is present in the database
    const document = await Document.findOne({ hash }).populate('userId', 'email username');

    // If the document is found, return a 200 status indicating its validity along with user information
    if (document) {
      return res.status(200).json({ message: 'Document is valid', user: document.userId });
    } else {
      return res.status(204).json({ message: 'Document is not valid' });
    }

  } catch (error) {
    // If an error occurs during the process, handle it and return a 500 status
    console.error('Error verifying document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/audit-logs/:documentId', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    // Find the document by its ID to ensure it exists
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Fetch audit logs associated with the document based on its ID
    const auditLogs = await AuditLog.find({ documentId }).populate('userId', 'username email');
    res.status(200).json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route to check if a document with a given hash exists
router.get('/check/:hash', async (req, res) => {
  try {
    const { hash } = req.params;

    // Check if a document with the provided hash exists
    const document = await Document.findOne({ hash });
    res.json({ exists: !!document });
  } catch (error) {
    console.error('Error checking document:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all documents associated with the authenticated user
router.get('/document', verifyToken, async (req, res) => {
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

router.put('/update', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { documentId, type, ipfsUrl, description, hash } = req.body;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Update document details
    document.ipfsUrl = ipfsUrl;
    document.type = type;
    document.hash = hash;
    document.lastUpdated = Date.now();
    await document.save();

    // Create an audit log entry
    const auditLog = new AuditLog({
      documentId: document._id,
      action: 'Document updated',
      userId: userId,
      description: description
    });
    await auditLog.save();

    res.status(200).json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch audit logs for a document
router.get('/audit-logs/:documentId', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;

    const auditLogs = await AuditLog.find({ documentId }).populate('userId', 'username email');
    res.status(200).json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
