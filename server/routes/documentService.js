// documentService.js

const Document = require('../models/documentSchema'); //Schema

async function uploadDocument(userId, documentHash) {
    try {
        const document = new Document({
            userId: userId,
            documentHash: documentHash
        });

        const savedDocument = await document.save();
        console.log('Document saved successfully:', savedDocument);
        return savedDocument;
    } catch (error) {
        console.error('Error saving document:', error);
        throw error;
    }
}

module.exports = {
    uploadDocument
};
