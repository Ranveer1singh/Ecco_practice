const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (user && user.isAdmin) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  
  module.exports = {isAdmin};