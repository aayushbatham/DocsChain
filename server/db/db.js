// db.js
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Export the mongoose connection
module.exports = mongoose.connection;
