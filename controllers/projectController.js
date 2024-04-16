// Ensure user authentication middleware is implemented and user data is attached to the request object (req.user)

// In projectController.js
const User = require("../models/User");
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

// Function to add a project
const addProject = async (req, res) => {
  const {
    projectName,
    role,
    projectRepository,
    projectMeet,
    teamSize,
    teamMembers,
  } = req.body;

  // You can retrieve ownerEmail from user authentication data if it's attached to the request object

  try {
    // Example: const ownerEmail = req.user.email;
    const ownerEmail = "example@example.com"; // Replace with authenticated user's email

    const project = new Project({
      projectName,
      role,
      projectRepository,
      projectMeet,
      teamSize,
      teamMembers,
      ownerEmail,
    });
    await project.save();
    res.status(201).json({ message: "Project details added successfully" });
  } catch (error) {
    console.error("Error adding project details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get projects by user
const getProjectsByUser = async (req, res) => {
  try {
    // Get user's email from authenticated user
    const userEmail = req.user.email;

    // Fetch projects created by the user
    const projects = await Project.find({ ownerEmail: userEmail });

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get teammates by project
const getTeammatesByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Fetch project details by project ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Return the list of team members for the project
    res.status(200).json({ teamMembers: project.teamMembers });
  } catch (error) {
    console.error("Error fetching teammates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addProject, getProjectsByUser, getTeammatesByProjectId };
