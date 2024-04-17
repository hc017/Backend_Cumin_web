// controllers/issueController.js
const Issue = require('../models/Issue');

// Create a new issue
const createIssue = async (req, res) => {
    try {
        const { title, description, projectId, userId } = req.body;
        const issue = new Issue({ title, description, projectId, userId });
        await issue.save();
        res.status(201).json({ message: 'Issue created successfully', issue });
    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all issues for a specific project
const getIssuesByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const issues = await Issue.find({ projectId });
        res.status(200).json({ issues });
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all issues for a specific user
const getIssuesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const issues = await Issue.find({ userId });
        res.status(200).json({ issues });
    } catch (error) {
        console.error('Error fetching issues:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createIssue, getIssuesByProjectId, getIssuesByUserId };
