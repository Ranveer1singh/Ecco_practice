const mongoose = require('mongoose');

const connect = () => {
  // mongoose.connect('mongodb://localhost:27017/Eco-practice')
  mongoose.connect('mongodb://127.0.0.1:27017/Eco-practice')

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = { connect };
