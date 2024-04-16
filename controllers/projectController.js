const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

const addProject = async (req, res) => {
  const {
    projectName,
    role,
    projectRepository,
    projectMeet,
    teamSize,
    teamMembers,
    ownerEmail
  } = req.body;

  try {
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

module.exports = { addProject };
