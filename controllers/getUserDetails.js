const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Function to get user details
const getUserDetails = async (req, res) => {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format: Bearer <token>
      
      // Verify the token
      const decodedToken = jwt.verify(token, 'hchchc');
      
      // Find the user based on the decoded token
      const user = await User.findById(decodedToken._id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
        
      // Return the user's data
      res.status(200).json({
        id: user._id,
        email: user.email
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 


module.exports = { getUserDetails };
