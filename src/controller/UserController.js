const User = require("../models/User");
const authUser = require("../middlewares/authMiddleware");

    // exports.userProfile = async(req,res,next)=>{
    //     try{
    //         const UserID = req.user._id;
    //         console.log("userid ",UserID);
    //         // User ID in data base
    //     const user = await User.findOne(UserID);

    //     if(!user){
    //         return res.status(404).
    //         json({Error : "User Not Found"})
    //     }

    //     res.status(200).
    //     json({
    //         data : user,
    //         message:"user found successfully",
    //     })
    //     }catch(err){
    //         res.status(500).json({
    //             error:"internal server error"
    //         });
    //     };
    // }
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
              id: user._id,
              name: user.name,
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