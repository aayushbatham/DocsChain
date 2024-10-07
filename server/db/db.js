const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL with the database name 'docschain'
const mongoURI = `${process.env.MONGO_URI}/docschain?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected to docschain'))
  .catch(err => console.error('MongoDB connection error:', err));

// Export the mongoose connection
module.exports = mongoose.connection;
