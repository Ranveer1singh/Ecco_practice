const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user data' });
    }

    // Find the user in the database
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {isAdmin};