const { verifyToken } = require('../config/jwt');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token without "Bearer" prefix
  try {
    const decoded = await verifyToken(token);
    // Debugging statement
    // console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err); // Debugging statement
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticateUser };
