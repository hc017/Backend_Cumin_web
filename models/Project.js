const mongoose = require('mongoose');

const projectDetailsSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    role: { type: String, required: true },
    projectRepository: { type: String, required: true },
    projectMeet: { type: String, required: true },
    teamSize: { type: String, required: true },
    teamMembers: [{ type: String }], // Changed to array to store multiple team members
});

module.exports = mongoose.model('Project', projectDetailsSchema);
