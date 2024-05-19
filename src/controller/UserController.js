const User = require("../models/User");
const authUser = require("../middlewares/authMiddleware");

exports.userProfile = async (req, res, next) => {
        try {
          const userId = req.user.userId;
      
          // Validate the user ID
          if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
          }
      
          // Fetch the user by ID
          const user = await User.findById(userId);
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Return the user's profile data
          res.status(200).json({
            data: {
              // id: user._id,
              name: user.name ,
              email: user.email,
              // Include any other necessary fields
            },
            message: 'User found successfully',
          });
        } catch (err) {
          console.error('Error fetching user profile:', err); // Log the error for debugging
          res.status(500).json({ error: 'Internal server error' });
        }
      }; 

