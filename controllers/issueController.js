// issueController.js

const Issue = require("../models/Issue");

// Function to add an issue to the selected project
const addIssueToProject = async (req, res) => {
  const {
    title,
    description,
    projectId,
    IuserEmail
  } = req.body;

  try {
    // const userEmail = req.user.email; // Get current user's email from authentication
    // Create the issue
    const newIssue = new Issue({
      title,
      description,
      projectId,
      IuserEmail
    });

    // Save the issue
    await newIssue.save();

    res.status(201).json({ message: "Issue added successfully" });
  } catch (error) {
    console.error("Error adding issue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete an issue by ID
const deleteIssueById = async (req, res) => {
    try {
      // Find the issue by ID and delete it
      const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
  
      // Check if the issue exists
      if (!deletedIssue) {
        return res.status(404).json({ message: "Issue not found" });
      }
  
      // Return success message
      res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error) {
      console.error("Error deleting issue:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { addIssueToProject, deleteIssueById };
