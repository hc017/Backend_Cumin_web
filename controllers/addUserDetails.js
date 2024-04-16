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

module.exports = { addDetails };
