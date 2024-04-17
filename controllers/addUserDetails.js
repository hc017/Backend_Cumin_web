const AdditionalDetails = require("../models/AddDetails");
const jwt = require('jsonwebtoken');

// addDetails controller
const addDetails = async (req, res) => {
  const { fullName, college, designation, github, mobile, whatsapp, email } = req.body;
  
  try {
    // Create additional details document
    const additionalDetails = new AdditionalDetails({
      fullName,
      college,
      designation,
      github,
      mobile,
      whatsapp,
      email,
    });

    // Save additional details to the database
    await additionalDetails.save();

    res.status(201).json({ message: "Additional details stored successfully" });
  } catch (error) {
    console.error("Error storing additional details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get details controller// Get details controller
const getDetails = async (req, res) => {
  const { userEmail } = req.body; // Extract userEmail from request body

  try {
    // Find the additional details document by userEmail
    const details = await AdditionalDetails.findOne({ email: userEmail });

    if (!details) {
      // If details are not found, return a 404 status and message
      return res.status(404).json({ detailsExist: false });
    }

    // If details are found, return them
    res.status(200).json({ details });
  } catch (error) {
    // If an error occurs, return a 500 status and error message
    console.error("Error fetching details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { addDetails, getDetails };
