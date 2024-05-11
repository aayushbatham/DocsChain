const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require("./db/db");

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
}));
// Routes
app.use('/user', userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
