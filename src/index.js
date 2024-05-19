const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/User");
const adminRoutes = require("./routes/admin");
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
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
