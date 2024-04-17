require('dotenv').config();

const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser } = require('../controllers/userController');
const { addDetails } = require("../controllers/addUserDetails");

const auth = require('../controllers/auth'); // Import the auth middleware
const { addProject, getProjectsByUser, getTeammatesByProject, getTeammatesByProjectId } = require('../controllers/projectController');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/addproject', auth, addProject);
router.get("/userprojects", auth, getProjectsByUser);
router.post("/userprojects", auth, getProjectsByUser);
router.get("/projects/:projectId/teammates", getTeammatesByProjectId);
router.get('/getuser', getUser);
router.post('/addi', addDetails); // Apply the auth middleware to protect this route


module.exports = router;
