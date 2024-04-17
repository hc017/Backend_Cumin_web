require('dotenv').config();

const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser } = require('../controllers/userController');
const { addDetails, getDetails } = require("../controllers/addUserDetails");

const auth = require('../controllers/auth'); // Import the auth middleware
const { addProject, getProjectsByUser, getTeammatesByProjectId } = require('../controllers/projectController');
const { addTaskToProject } = require('../controllers/taskController');
const { addIssueToProject, deleteIssueById } = require('../controllers/issueController');

router.get("/userprojects", auth, getProjectsByUser);
router.get('/getuser', getUser);
router.get("/projects/:projectId/teammates", getTeammatesByProjectId);
router.get('/addiget', getDetails); // Apply the auth middleware to protect this route
router.post('/addiget', getDetails); // Apply the auth middleware to protect this route
router.post('/login', loginUser);
router.post('/signup', createUser);
router.post('/addproject', auth, addProject);
router.post('/tasks/add', auth, addTaskToProject);
router.post("/userprojects", auth, getProjectsByUser);
router.post('/addi', addDetails); // Apply the auth middleware to protect this route
router.post('/issues/add', auth, addIssueToProject);
router.delete('/issues/:id', auth, deleteIssueById);


module.exports = router;
