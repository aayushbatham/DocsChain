const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
require("./db/db");

const userRoutes = require('./routes/userRoutes');
const document = require('./routes/documentRoute'); 

const app = express();

// Allow CORS from your Vercel domain
app.use(cors({
  origin: ['https://docs-chain.vercel.app'], // Your Vercel domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Include the headers you are using in requests
  credentials: true, // Add if you are using cookies or sessions
}));

app.options('*', cors()); // Preflight requests for all routes
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/user', userRoutes);
app.use('/document', document);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
