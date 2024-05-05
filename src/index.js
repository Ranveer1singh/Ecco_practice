const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
db.connect();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
