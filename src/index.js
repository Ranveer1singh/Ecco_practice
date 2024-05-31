const express = require('express');
const http = require('http');
const morgan = require('morgan')
const db = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/User");
const adminRoutes = require("./routes/admin");
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const app = express();

require('events').EventEmitter.defaultMaxListeners = 20; // or any other higher value

// Connect to MongoDB function
db.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')) // for logging http request and monitoring and debugging

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
// Start server
server.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running at http://localhost:${PORT}/`);
  }
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});