const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require("./db/db");

const userRoutes = require('./routes/userRoutes');
const document = require('./routes/documentRoute'); 

const app = express();

// Add CORS configuration here
const allowedOrigins = ['https://docs-chain.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps, or postman
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/user', userRoutes);
app.use('/document', document);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
