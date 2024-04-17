// issue.js

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to the project
    IuserEmail: { type: String, required: true } // Current user's email
});

module.exports = mongoose.model('Issue', issueSchema);
