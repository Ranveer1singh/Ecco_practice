const { verifyToken } = require('../config/jwt');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token without "Bearer" prefix
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};


module.exports = { authenticateUser };
