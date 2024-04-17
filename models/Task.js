// task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    task: { type: String, required: true },
    taskAssign: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to the project
    ProjUserEmail: { type: String, required: true } // Current user's email
});

module.exports = mongoose.model('Task', taskSchema);
