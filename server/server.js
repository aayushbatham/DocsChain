const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require("./db/db");

const userRoutes = require('./routes/userRoutes');
const document = require('./routes/documentRoute'); 

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS with the options
app.use(cors(corsOptions));
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
