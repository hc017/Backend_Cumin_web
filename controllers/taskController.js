// taskController.js

const Task = require("../models/Task");

// Function to add a task to the selected project
const addTaskToProject = async (req, res) => {
  const {
    name,
    task,
    taskAssign,
    startDate,
    endDate,
    description,
    projectId,
    ProjUserEmail
  } = req.body;

  try {



    // Create the task
    const newTask = new Task({
      name,
      task,
      taskAssign,
      startDate,
      endDate,
      description,
      projectId,
      ProjUserEmail,
    });

    // Save the task
    await newTask.save();

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addTaskToProject };
