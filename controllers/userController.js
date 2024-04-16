const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const encryptedPassw = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: encryptedPassw, // Store the hashed password
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email, username }, // Use user._id instead of newUser._id
      "newkyewuehh",
      { expiresIn: "90d" }
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// loginUser controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, "newkyewuehh", {
      expiresIn: "90d",
    });

    // Return user's email along with the token
    res.status(200).json({
      token,
      userEmail: user.email,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getUser = async (req, res) => {

  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the format: Bearer <token>
    
    // Verify the token
    const decodedToken = jwt.verify(token, 'newkyewuehh');
    
    // Find the user based on the decoded token
    const user = await User.findById(decodedToken.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
      
    // Return the user's data
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNo: user.mobileNo
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};







module.exports = { createUser, loginUser, getUser };
